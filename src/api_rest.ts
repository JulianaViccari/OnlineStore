import express, { Request, Response } from "express";
import Checkout from "./checkout";
import ProductInMemoryRepository from "./repository/implementations/product_in_memory_repository";
import CouponInMemoryRepository from "./repository/implementations/coupon_in_memory_repository";
import EmailInMemoryRepository from "./repository/implementations/email_in_memory_repository";
import Order from "./entities/order";
import OrderMysqlRepository from "./repository/implementations/order_mysql_repository";
import Client from "./entities/client";
const app = express();

app.use(express.json());

// const orders: Array<Order> = [];

// function getOrderById(orderId: string): Array<Order> {
//   return orders.filter((o) => o.getId() === orderId);
// }

// function getOrder(): Array<Order> {
//   return orders;
// }

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
      req.body.items,
      new Client("", req.body.cpf, "", "")
    );
    order.generateId();
    
    await orderRepository.create(order);
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
