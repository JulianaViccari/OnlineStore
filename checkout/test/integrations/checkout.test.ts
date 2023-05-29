import Product from "../../src/domain/entities/product";
import OrderDetail from "../../src/domain/entities/order_detail";
import Checkout from "../../src/application/usecase/checkout";
import DatabaseRepositoryFactory from "../../src/infra/factory/database_repository_factory";
import DatabaseConnection from "../../src/infra/database/database_connection";
import MySQLAdapter from "../../src/infra/repository/implementations/msql_adapters";
import GetOrder from "../../src/application/usecase/get_order";
import AxiosAdapter from "../../src/infra/http/axios_adapter";
import GatewayHttpFactory from "../../src/infra/factory/gateway_http_factory";
import sinon from "sinon";
import CatalogHttpGateway from "../../src/infra/gateway/catalog_http_gateway";

let checkout: Checkout;
let getOrder: GetOrder;
let connection: DatabaseConnection;

beforeEach(async () => {
  connection = new MySQLAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const httpClient = new AxiosAdapter();
  const gatewayFactory = new GatewayHttpFactory(httpClient);

  checkout = new Checkout(repositoryFactory, gatewayFactory);
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
  const productRepositoryStub = sinon
    .stub(CatalogHttpGateway.prototype, "getProduct")
    .resolves(new Product("1", "Dove", "shampoo", 17.0, 1, 1, 1, 1, 0.03, 100));
  let products = [
    new Product("1", "Dove", "shampoo", 17.0, 1, 1, 1, 1, 0.03, 100),
  ];
  let listOrderDetails = [new OrderDetail(products[0], 2)];

  const input = {
    cpf: "407.302.170-27",
    items: listOrderDetails,
    from: "14620000", //cep origem
    to: "06445550", //cep destino
  };
  const output = await checkout.execute(input);
  expect(output.freight).toBe(59.99999999999999);
  expect(output.total).toBe(94);
  productRepositoryStub.restore();
});

afterEach(async () => {
  await connection.close();
});
