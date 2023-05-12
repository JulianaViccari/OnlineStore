import OrderDTO from "../dtos/order_dto";

export default interface OrderRepository {
  create(order: OrderDTO): Promise<void>;
  getById(orderId: string): Promise<OrderDTO | undefined>;
  getAll(): Promise<Array<OrderDTO> | undefined>;
}
