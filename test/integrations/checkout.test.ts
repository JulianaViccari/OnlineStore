import Product from "../../src/entities/product";
import OrderDetail from "../../src/entities/order_detail";
import Checkout from "../../src/checkout";
import ProductInMemoryRepository from "../../src/repository/implementations/product_in_memory_repository";
import CouponInMemoryRepository from "../../src/repository/implementations/coupon_in_memory_repository";
import OrderMysqlRepository from "../../src/repository/implementations/order_mysql_repository";


let checkout: Checkout;

beforeEach(() => {
  const productsRepository = new ProductInMemoryRepository();
  const orderRepository = new OrderMysqlRepository();
  const couponRepository = new CouponInMemoryRepository();

  checkout = new Checkout(
    productsRepository,
    couponRepository,
    orderRepository
  );
});

test("must not create an order with invalid CPF", async function () {
  const input = {
    cpf: "406.302.107-27",
    items: [],
  };

  expect(() => checkout.execute(input)).rejects.toThrow(
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
  expect(output.subtotal).toBe(82);
  expect(output.total).toBe(6092);
});