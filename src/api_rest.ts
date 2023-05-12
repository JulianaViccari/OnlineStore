import express, { Request, Response } from "express";
import Checkout from "./checkout";
import ProductInMemoryRepository from "./repository/implementations/product_in_memory_repository";
import CouponInMemoryRepository from "./repository/implementations/coupon_in_memory_repository";
import EmailInMemoryRepository from "./repository/implementations/email_in_memory_repository";
import Order from "./entities/order";
import OrderMysqlRepository from "./repository/implementations/order_mysql_repository";
import Client from "./entities/client";
import OrderDetail from "./entities/order_detail";
import Product from "./entities/product";
import OrderFactory from "./factories/order_factory";
const app = express();

app.use(express.json());

function buildDetails(inputList: Array<any>): Array<OrderDetail> {
  const orderDetails: Array<OrderDetail> = [];
  inputList.forEach((input) => {
    orderDetails.push(
      new OrderDetail(new Product(input.product.id, "", "", 0), input.quantity)
    );
  });
  return orderDetails;
}

app.post("/checkout", async function (req: Request, resp: Response) {
  try {
    const productsRepository = new ProductInMemoryRepository();
    const couponsRepository = new CouponInMemoryRepository();
    const emailGateway = new EmailInMemoryRepository();
    const orderRepository = new OrderMysqlRepository();

    let output = await new Checkout(
      productsRepository,
      couponsRepository,
      emailGateway
    ).execute(req.body);
    const order = new Order(
      "",
      buildDetails(req.body.items),
      new Client("", req.body.cpf, "", "")
    );
    order.generateId();
    const orderDTO = OrderFactory.buildOrderDTO(order);
    await orderRepository.create(orderDTO);
    output.orderId = order.getId();
    resp.json(output);
  } catch (error: any) {
    console.log(error.message);
    resp.status(422).json({
      message: error.message,
    });
  }
});
app.get("/:orderId", async function (req: Request, resp: Response) {
  const order = await new OrderMysqlRepository().getById(req.params["orderId"]);
  resp.send(order);
});

app.get("/", async function (req: Request, resp: Response) {
  const orders = await new OrderMysqlRepository().getAll();
  resp.send(orders);
});
app.listen(3000);
