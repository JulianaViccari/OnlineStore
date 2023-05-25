import Product from "../../src/domain/entities/product";
import OrderDetail from "../../src/domain/entities/order_detail";
import Checkout from "../../src/application/usecase/checkout";
import DatabaseRepositoryFactory from "../../src/infra/factory/database_repository_factory";
import DatabaseConnection from "../../src/infra/database/database_connection";
import MySQLAdapter from "../../src/infra/repository/implementations/msql_adapters";
import GetOrder from "../../src/application/usecase/get_order";

let checkout: Checkout;
let getOrder: GetOrder;
let connection: DatabaseConnection;

beforeEach(async () => {
  connection = new MySQLAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);

  checkout = new Checkout(repositoryFactory);
  getOrder = new GetOrder(repositoryFactory);
});

test("must not create an order with invalid CPF", async function () {
  const input = {
    cpf: "406.302.107-27",
    items: [],
  };

  await expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Invalid cpf")
  );
});

// test("Must place an order with 3 items and get the order saved", async function () {
//   const idOrder = crypto.randomUUID();
//   let products = [
//     new Product("1", "Dove", "shampoo", 17.0, 0, 0, 0, 0),
//     new Product("2", "Siege", "shampoo", 48.0, 0, 0, 0, 0),
//     new Product("3", "Dove", "condicionador", 22.0, 0, 0, 0, 0),
//   ];
//   let listOrderDetails = [
//     new OrderDetail(products[0], 2),
//     new OrderDetail(products[1], 1),
//     new OrderDetail(products[2], 3),
//   ];
//   const input = {
//     cpf: "407.302.170-27",
//     items: listOrderDetails,
//   };
//   const output = await checkout.execute(input);
//   const orderMysqlRepositoryStub = sinon
//     .stub(OrderSqlRepository.prototype, "getById")
//     .resolves(
//       new OrderDTO(idOrder, undefined, undefined, output.total, undefined)
//     );
//   const orderDTO = await getOrder.execute(idOrder);
//   expect(orderDTO?.amount).toBe(148);
//   orderMysqlRepositoryStub.restore();
// });

test("must create an order", async function () {
  let products = [new Product("1", "Dove", "shampoo", 17.0, 0, 0, 0, 0)];
  let listOrderDetails = [new OrderDetail(products[0], 2)];

  const input = {
    cpf: "407.302.170-27",
    items: listOrderDetails,
  };

  const output = await checkout.execute(input);
  expect(output.total).toBe(34);
});

test("should make an order with three items", async function () {
  let products = [
    new Product("1", "Dove", "shampoo", 17.0, 0, 0, 0, 0),
    new Product("2", "Siege", "shampoo", 48.0, 0, 0, 0, 0),
    new Product("3", "Dove", "condicionador", 22.0, 0, 0, 0, 0),
  ];
  let listOrderDetails = [
    new OrderDetail(products[0], 2),
    new OrderDetail(products[1], 1),
    new OrderDetail(products[2], 3),
  ];
  const input = {
    cpf: "407.302.170-27",
    items: listOrderDetails,
  };

  const output = await checkout.execute(input);
  expect(output.total).toBe(148);
});

test("should make an order with three items with coupon", async function () {
  let products = [
    new Product("1", "Dove", "shampoo", 17.0, 0, 0, 0, 0),
    new Product("2", "Siege", "shampoo", 48.0, 0, 0, 0, 0),
    new Product("3", "Dove", "condicionador", 22.0, 0, 0, 0, 0),
  ];
  let listOrderDetails = [
    new OrderDetail(products[0], 2),
    new OrderDetail(products[1], 1),
    new OrderDetail(products[2], 3),
  ];
  const input = {
    cpf: "407.302.170-27",
    items: listOrderDetails,
    coupon: "discount20",
  };
  const output = await checkout.execute(input);
  expect(input.coupon).toBeDefined();
  expect(output.total).toBe(118.4);
});

test("should make an order with two items with shipment", async function () {
  let products = [
    new Product("1", "Dove", "shampoo", 17.0, 0, 0, 0, 0),
    new Product("2", "Siege", "shampoo", 48.0, 0, 0, 0, 0),
  ];
  let listOrderDetails = [
    new OrderDetail(products[0], 2),
    new OrderDetail(products[1], 1),
  ];

  const input = {
    cpf: "407.302.170-27",
    items: listOrderDetails,
    from: "14620000", //cep origem
    to: "06445550", //cep destino
  };
  const output = await checkout.execute(input);
  expect(output.freight).toBe(6010);
  expect(output.total).toBe(6092);
});
afterEach(async () => {
  await connection.close();
});
