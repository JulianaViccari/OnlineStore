import OrderDTO from "./dtos/order_dto";
import OrderMysqlRepository from "./repository/implementations/order_mysql_repository";
import OrderRepository from "./repository/order_repository_interface";

export default class GetOrder {
    constructor(
        readonly orderRepository: OrderRepository = new OrderMysqlRepository()) {

    }
    async execute(orderId: string): Promise<OrderDTO | undefined> {
        const orderData = await this.orderRepository.getById(orderId);
        return orderData;
    }
}
