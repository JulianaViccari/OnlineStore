import { connect } from "amqplib";
import Checkout from "./checkout";
import CouponInMemoryRepository from "./repository/implementations/coupon_in_memory_repository";
import ProductInMemoryRepository from "./repository/implementations/product_in_memory_repository";
import OrderMysqlRepository from "./repository/implementations/order_mysql_repository";

async function main() {
  const connection = await connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("checkout", { durable: true });
  channel.consume("checkout", function (msg: any) {
    const input = JSON.parse(msg.content.toString());
    try {
      const productsRepository = new ProductInMemoryRepository();
      const orderRepository = new OrderMysqlRepository();
      const couponRepository = new CouponInMemoryRepository();

      const output = new Checkout(
        productsRepository,
        couponRepository,
        orderRepository
      ).execute(input);
      console.log(output);
      channel.ack(msg);
    } catch (error) {
      console.log(error);
    }
  });
}

main();
