import { connect } from "amqplib";
import Checkout from "./application/usecase/checkout";
import DatabaseRepositoryFactory from "./infra/factory/database_repository_factory";
import MySQLAdapter from "./infra/repository/implementations/msql_adapters";
import AxiosAdapter from "./infra/http/axios_adapter";
import GatewayHttpFactory from "./infra/factory/gateway_http_factory";

const connection = new MySQLAdapter();
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const httpClient = new AxiosAdapter();
const gatewayFactory = new GatewayHttpFactory(httpClient);

async function main() {
  const connection = await connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("checkout", { durable: true });
  channel.consume("checkout", function (msg: any) {
    const input = JSON.parse(msg.content.toString());
    try {
      const output = new Checkout(repositoryFactory, gatewayFactory).execute(input);
      console.log(output);
      channel.ack(msg);
    } catch (error) {
      console.log(error);
    }
  });
}

main();
