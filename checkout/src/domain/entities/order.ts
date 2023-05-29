import Client from "./client";
import Coupon from "./coupon";
import OrderDetail from "./order_detail";
import crypto from "crypto";

export default class Order {
  id: string;
  code: string;
  orderDetails: Array<OrderDetail>;
  coupon?: Coupon

  constructor(
    readonly client: Client,
    readonly date: Date = new Date(),
    readonly sequence: number = 1
  ) {
    this.id = crypto.randomUUID();
    this.code = `${date.getFullYear()}${String(sequence).padStart(8, "0")}`;
    this.client = client;
    this.orderDetails = [];
  }

  getId(): string {
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

    if(this.coupon){
      total -= this.coupon.calculateDiscount(total);
    }
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

  addCoupon(coupon: Coupon){
    if (coupon.isValid()) this.coupon = coupon;
  }

  getDetails(): Array<OrderDetail> {
    return this.orderDetails;
  }
}
