import Client from "../../domain/entities/client";
import Order from "../../domain/entities/order";
import OrderDetail from "../../domain/entities/order_detail";
import OrderFactory from "../../domain/factories/order_factory";
import GatewayFactory from "../factory/gateway_factory";
import RepositoryFactory from "../factory/repository_factory";
import AuthGateway from "../gateway/auth_gateway";
import CatalogGateway from "../gateway/catalog_gateway";
import FreightGateway from "../gateway/freight_gateway";
import CouponRepository from "../repository/coupon_repository_interface";
import OrderRepository from "../repository/order_repository_interface";
import Usecase from "./usecase";
// import SimulateFreight from "../repository/simulate_freight";

type Output = {
  code: string;
  total: number;
  freight: number;
};

export default class Checkout implements Usecase{
  orderRepository: OrderRepository;
  couponRepository: CouponRepository;
  catalogGateway: CatalogGateway;
  freightGateway: FreightGateway;

  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();

    repositoryFactory.createProductRepositoryInMemory();
    this.catalogGateway = gatewayFactory.createCatalogGateway();
    this.freightGateway = gatewayFactory.createFreightGateway();
  }
  public async execute(input: any): Promise<Output> {
    try {
      const output = { code: "", freight: 0, total: 0 };
      const sequence = await this.orderRepository.count();
      const client = new Client("", input.cpf, "", "");
      const order = new Order(client, input.date, sequence + 1);
      output.code = order.code;
      const inputFreight: any = {
        product: [],
        from: input.from,
        to: input.to,
      };
      for (const item of input.items) {
        // let product = await this.productRepository.get(item.product.id);
        const product = await this.catalogGateway.getProduct(item.product.id);

        const orderDetail = new OrderDetail(product, item.quantity);
        order.addItem(orderDetail);
        // output.freight += SimulateFreight.calculate(product) * item.quantity;
        inputFreight.product.push({
          volume: product.volume,
          density: product.density,
          quantity: item.quantity,
        });
      }

      if (input.from && input.to) {
        const outputFreight = await this.freightGateway.simulateFreight(
          inputFreight
        );
        output.freight += outputFreight.freight;
      }

      if (input.coupon) {
        const coupon = await this.couponRepository.get(input.coupon);
        if (!coupon) throw new Error("Coupon invalid");

        order.addCoupon(coupon);
      }

      output.total = order.getAmount();
      output.total += output.freight;
      const orderDTO = OrderFactory.buildOrderDTO(order);
      await this.orderRepository.create(orderDTO);

      return output;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
