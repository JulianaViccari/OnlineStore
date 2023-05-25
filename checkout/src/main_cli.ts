import Checkout from "./application/usecase/checkout";
import OrderDetail from "./domain/entities/order_detail";
import Product from "./domain/entities/product";
import DatabaseRepositoryFactory from "./infra/factory/database_repository_factory";
import MySQLAdapter from "./infra/repository/implementations/msql_adapters";
const input: { cpf: string; items: OrderDetail[]; from: string; to: string } = {
  cpf: "",
  items: [],
  from: "",
  to: "",
};
const connection = new MySQLAdapter();
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);

process.stdin.on("data", function (data) {
  const command = data.toString().replace(/\n/g, "");
  if (command.startsWith("set-cpf")) {
    input.cpf = command.replace("set-cpf", "");
    console.log(input);
    return;
  }
  if (command.startsWith("add-item")) {
    const [idProduct, quantity] = command.replace("add-item ", "").split(" ");
    const orderDetail = new OrderDetail(
      new Product(idProduct, "", "", 0, 0, 0, 0, 0),
      parseInt(quantity)
    );

    input.items.push(orderDetail);
    console.log(input);
    return;
  }
  if (command.startsWith("set-from")) {
    input.from = command.replace("set-from", "");
    console.log(input);
    return;
  }
  if (command.startsWith("set-to")) {
    input.to = command.replace("set-to", "");
    console.log(input);
    return;
  }
  if (command.startsWith("checkout")) {
    try {
      const output = new Checkout(repositoryFactory).execute(input);
      console.log(output);
      return;
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  }
  if (command.startsWith("quit")) {
    process.exit(0);
  }
  console.log("Invalid command");
});
