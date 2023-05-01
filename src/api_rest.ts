import express, { Request, Response } from "express";
import Checkout from "./checkout";
import ProductInMemoryRepository from "./product_in_memory_repository";
import CouponInMemoryRepository from "./coupon_in_memory_repository";
import EmailInMemoryRepository from "./email_in_memory_repository";
const app = express();

app.use(express.json());

app.post("/checkout", async function (req: Request, resp: Response) {
  try {
    const productsRepository = new ProductInMemoryRepository();
    const couponsRepository = new CouponInMemoryRepository();
    const emailGateway = new EmailInMemoryRepository();

    const output = new Checkout(productsRepository, couponsRepository, emailGateway).execute(req.body);
    resp.json(output);
    return;
  } catch (error: any) {
    console.log(error.message);
    resp.status(422).json({
      message: error.message,
    });
    return;
  }
});
app.listen(3000);
