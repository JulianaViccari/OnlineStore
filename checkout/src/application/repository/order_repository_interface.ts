import OrderDTO from "../../dtos/order_dto";

export default interface OrderRepository {
  count(): Promise<number>;
  create(order: OrderDTO): Promise<void>;
  getById(orderId: string): Promise<OrderDTO | undefined>;
  getAll(): Promise<Array<OrderDTO> | undefined>;
}
