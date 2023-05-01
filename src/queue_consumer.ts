import { connect } from "amqplib";
import Checkout from "./checkout";
import ProductInMemoryRepository from "./product_in_memory_repository";
import CouponInMemoryRepository from "./coupon_in_memory_repository";
import EmailInMemoryRepository from "./email_in_memory_repository";

async function main() {
  const connection = await connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("checkout", { durable: true });
  channel.consume("checkout", function (msg: any) {
    const input = JSON.parse(msg.content.toString());
    try {
      const productsRepository = new ProductInMemoryRepository();
      const couponsRepository = new CouponInMemoryRepository();
      const emailGateway = new EmailInMemoryRepository();

      const output = new Checkout(
        productsRepository,
        couponsRepository,
        emailGateway
      ).execute(input);
      console.log(output);
      channel.ack(msg);
    } catch (error) {
      console.log(error);
    }
  });
}

main();
