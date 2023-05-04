import express, { Request, Response } from "express";
import Checkout from "./checkout";
import ProductInMemoryRepository from "./product_in_memory_repository";
import CouponInMemoryRepository from "./coupon_in_memory_repository";
import EmailInMemoryRepository from "./email_in_memory_repository";
import Order from "./entities/order";
const app = express();

app.use(express.json());

const orders: Array<Order> = [];

function getOrderById(orderId: string): Array<Order> {
  return orders.filter((o) => o.getId() === orderId);
}

function getOrder(): Array<Order> {
    return orders;
  }

app.post("/checkout", async function (req: Request, resp: Response) {
  try {
    const productsRepository = new ProductInMemoryRepository();
    const couponsRepository = new CouponInMemoryRepository();
    const emailGateway = new EmailInMemoryRepository();

    const output = new Checkout(
      productsRepository,
      couponsRepository,
      emailGateway
    ).execute(req.body);
    const order = new Order(req.body.items);
    orders.push(order);
    (await output).orderId = order.getId();
    resp.json((await output));
    return;
  } catch (error: any) {
    console.log(error.message);
    resp.status(422).json({
      message: error.message,
    });
    return;
  }
});
app.get("/:orderId", async function (req: Request, resp: Response) {
  const orderId = getOrderById(req.params["orderId"]);
  resp.send(orderId);
});

app.get("/", async function (req: Request, resp: Response) {
    resp.send(getOrder());
  });
app.listen(3000);
