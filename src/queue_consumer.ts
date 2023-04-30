import { connect } from "amqplib";
import { checkout } from "./checkout";

async function main() {
  const connection = await connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("checkout", { durable: true });
  channel.consume("checkout", function (msg: any) {
    const input = JSON.parse(msg.content.toString());
    try {
      const output = checkout(input);
      console.log(output);
      channel.ack(msg);
    } catch (error) {
      console.log(error);
    }
  });
}

main();
