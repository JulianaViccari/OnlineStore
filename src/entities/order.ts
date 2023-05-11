import Client from "./client";
import OrderDetail from "./order_detail";

export default class Order {
  private id: string;
  private client?: Client;
  private orderDetails: Array<OrderDetail>;

  constructor(id: string, productList: Array<OrderDetail>, client?: Client) {
    this.id = id;
    this.client = client;
    this.orderDetails = productList;
  }

  getId(): string {
    return this.id;
  }

  getClientCpf(): string {
    return this.client === undefined ? "null" : this.client.getCpf();
  }

  getClientAddress(): string {
    return this.client === undefined ? "null" : this.client.getAddress();
  }

  getAmount(): number {
    let total = 0;
    this.orderDetails.forEach((orderDetail) => {
      total += orderDetail.getProductAmount();
    });
    return total;
  }

  generateId(): void {
    this.id = `${new Date().getFullYear()}${Math.floor(
      Math.random() * 10000 + 1
    )
      .toString()
      .padStart(8, "0")}`;
  }
}
