import ClientDTO from "./client_dto";
import OrderDetailDTO from "./order_detail_dto";

export default class OrderDTO {
  id?: string;
  client?: ClientDTO;
  orderDetails?: Array<OrderDetailDTO>;
  amount?: number;

  constructor(
    id?: string,
    orderDetails?: Array<OrderDetailDTO>,
    client?: ClientDTO,
    amount?: number
  ) {
    this.id = id;
    this.client = client;
    this.orderDetails = orderDetails;
    this.amount = amount;
  }

}
