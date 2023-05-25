import Client from "../../domain/entities/client";
import Order from "../../domain/entities/order";
import OrderDetail from "../../domain/entities/order_detail";
import OrderFactory from "../../domain/factories/order_factory";
import RepositoryFactory from "../factory/repository_factory";
import CouponRepository from "../repository/coupon_repository_interface";
import OrderRepository from "../repository/order_repository_interface";
import ProductRepository from "../repository/product_repository_interface";
import SimulateFreight from "../repository/simulate_freight";


type Output = {
  total: number;
  freight: number;
};

export default class Checkout {
  orderRepository: OrderRepository;
  couponRepository: CouponRepository;
  productRepository: ProductRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.productRepository =
      repositoryFactory.createProductRepositoryInMemory();
  }
  public async execute(input: any): Promise<Output> {
    try {
      const output = {
        freight: 0,
        total: 0,
      };
      const sequence = await this.orderRepository.count();
      const client = new Client("", input.cpf, "", "");
      const order = new Order(client, input.date, sequence + 1);

      for (const item of input.items) {
        let product = await this.productRepository.get(item.product.id);

        const orderDetail = new OrderDetail(product, item.quantity);
        order.addItem(orderDetail);
        if (input.from && input.to) {
          output.freight += SimulateFreight.calculate(product) * item.quantity;
        }
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
