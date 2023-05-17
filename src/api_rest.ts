import express, { Request, Response } from "express";
import Checkout from "./checkout";
import ProductInMemoryRepository from "./repository/implementations/product_in_memory_repository";
import Order from "./entities/order";
import OrderMysqlRepository from "./repository/implementations/order_mysql_repository";
import Client from "./entities/client";
import OrderDetail from "./entities/order_detail";
import Product from "./entities/product";
import OrderFactory from "./factories/order_factory";
import CouponInMemoryRepository from "./repository/implementations/coupon_in_memory_repository";
import SimulateFreight from "./simulate_freight";
const app = express();

app.use(express.json());

app.post("/checkout", async function (req: Request, resp: Response) {
  try {
    const productsRepository = new ProductInMemoryRepository();
    const orderRepository = new OrderMysqlRepository();
    const couponRepository = new CouponInMemoryRepository();

    let output = await new Checkout(
      productsRepository,
      couponRepository,
      orderRepository
    ).execute(req.body);
    resp.json(output);
  } catch (error: any) {
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
