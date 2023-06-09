import { connect } from "amqplib";
import OrderDetail from "./domain/entities/order_detail";
import Product from "./domain/entities/product";

const input: { cpf: string; items: OrderDetail[]; from: string; to: string } = {
  cpf: "",
  items: [],
  from: "",
  to: "",
};

async function main() {
  const connection = await connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("checkout", { durable: true });
  input.cpf = "407.302,170-27";
  input.items.push(new OrderDetail(new Product("1", "", "", 0, 0, 0, 0, 0), 2));
  input.items.push(new OrderDetail(new Product("2", "", "", 0, 0, 0, 0, 0), 2));
  input.from = "14620000";
  input.to = "06445550";
  channel.sendToQueue("checkout", Buffer.from(JSON.stringify(input)));
}

main();
