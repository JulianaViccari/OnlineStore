import Client from "./client";
import OrderDetail from "./order_detail";

export default class Order {
  code: string;
  orderDetails: Array<OrderDetail>;

  constructor(
    readonly id: string | undefined,
    readonly client: Client,
    date: Date = new Date(),
    sequence: number = 1
  ) {
    this.id = id;
    this.code = `${date.getFullYear()}${new String(sequence).padStart(8, "0")}`;
    this.client = client;
    this.orderDetails = [];
  }

  getId(): string | undefined {
    return this.id;
  }

  getCode(): string {
    return this.code;
  }

  getClient(): Client {
    return this.client;
  }

  getClientCpf(): string {
    return this.client.getCpf();
  }

  getClientAddress(): string {
    return this.client.getAddress();
  }

  getAmount(): number {
    let total = 0;
    this.orderDetails.forEach((orderDetail) => {
      total += orderDetail.getProductAmount();
    });
    return total;
  }

  addItem(orderDetail: OrderDetail) {
    if (
      this.orderDetails.some(
        (detail: OrderDetail) => detail.getProductId() === orderDetail.getProductId()
      )
    )
      throw new Error("must not repeat item");
    this.orderDetails.push(orderDetail);
  }

  getDetails(): Array<OrderDetail> {
    return this.orderDetails;
  }
}
