import OrderDTO from "./dtos/order_dto";
import RepositoryFactory from "./factories/repository_factory";
import OrderRepository from "./repository/order_repository_interface";

export default class GetOrders {
    orderRepository: OrderRepository;
    constructor(repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }
    async execute(): Promise<OrderDTO[] | undefined> {
        const orderData = await this.orderRepository.getAll();
        return orderData;
    }
}