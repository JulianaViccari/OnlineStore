import ProductRepository from "./repository/product_repository_interface";
import CouponRepository from "./repository/coupon_repository_interface";
import Order from "./entities/order";
import OrderRepository from "./repository/order_repository_interface";
import Client from "./entities/client";
import SimulateFreight from "./simulate_freight";
import OrderDetail from "./entities/order_detail";
import OrderFactory from "./factories/order_factory";

type Output = {
  total: number;
  freight: number;
};

export default class Checkout {
  constructor(
    readonly productRepository: ProductRepository,
    readonly couponRepository: CouponRepository, 
    readonly orderRepository: OrderRepository
  ) {}
  public async execute(input: any): Promise<Output> {
    const output = {
      freight: 0,
      total: 0,
    };
    const sequence = await this.orderRepository.count();
    const client = new Client("", input.cpf, "", "");
    const order = new Order(input.idOrder, client, input.date, sequence + 1);
    
    for (const item of input.items) {
      let product = await this.productRepository.get(item.product.id);
      const orderDetail = new OrderDetail(product, item.quantity)
      order.addItem(orderDetail);
      if (input.from && input.to) {
        output.freight += SimulateFreight.calculate(product) * item.quantity;
      }
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.get(input.coupon);
      if(!coupon)throw new Error("Coupon invalid");
      
      order.addCoupon(coupon);
    }

    output.total = order.getAmount();
    output.total += output.freight;
    const orderDTO = OrderFactory.buildOrderDTO(order);
    await this.orderRepository.create(orderDTO);

    return output;
  }
}
