import OrderDTO from "../../dtos/order_dto";
import RepositoryFactory from "../factory/repository_factory";
import OrderRepository from "../repository/order_repository_interface";

export default class GetOrder {
  orderRepository: OrderRepository;
  constructor(repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
  }
  async execute(orderId: string): Promise<OrderDTO | undefined> {
    const orderData = await this.orderRepository.getById(orderId);
    return orderData;
  }
}
