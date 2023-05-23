import { connect } from "amqplib";
import Checkout from "./checkout";
import CouponInMemoryRepository from "./repository/implementations/coupon_in_memory_repository";
import ProductInMemoryRepository from "./repository/implementations/product_in_memory_repository";
import OrderSqlRepository from "./repository/implementations/order_sql_repository";
import DatabaseRepositoryFactory from "./factories/database_repository_factory";
import MySQLAdapter from "./repository/implementations/msql_adapters";

const connection = new MySQLAdapter();
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);

async function main() {
  const connection = await connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("checkout", { durable: true });
  channel.consume("checkout", function (msg: any) {
    const input = JSON.parse(msg.content.toString());
    try {
      const output = new Checkout(repositoryFactory).execute(input);
      console.log(output);
      channel.ack(msg);
    } catch (error) {
      console.log(error);
    }
  });
}

main();
