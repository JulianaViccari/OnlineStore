import Order from "../entities/order";

export default interface OrderRepository {
  create(order: Order): Promise<void>;
  getById(orderId: string): Promise<Order | undefined>;
  getAll(): Promise<Array<Order> | undefined>;
}
