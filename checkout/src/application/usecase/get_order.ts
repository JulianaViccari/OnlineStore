import OrderDTO from "../../dtos/order_dto";
import GatewayFactory from "../factory/gateway_factory";
import RepositoryFactory from "../factory/repository_factory";
import AuthGateway from "../gateway/auth_gateway";
import OrderRepository from "../repository/order_repository_interface";

export default class GetOrder {
  orderRepository: OrderRepository;
  authGateway: AuthGateway

  constructor(repositoryFactory: RepositoryFactory, gatewayFactory: GatewayFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.authGateway = gatewayFactory.createAuthGateway();
  }

  async execute(orderId: string): Promise<OrderDTO | undefined> {
    const orderData = await this.orderRepository.getById(orderId);
    return orderData;
  }
}
