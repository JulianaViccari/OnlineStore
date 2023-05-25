import crypto from "crypto";
import Client from "../../../src/domain/entities/client";
import Order from "../../../src/domain/entities/order";
import OrderDetail from "../../../src/domain/entities/order_detail";
import Product from "../../../src/domain/entities/product";

test("Should created new order ", function () {
  let client = new Client(
    "Henrique Viccari",
    "407.302.170-27",
    "h.v@gmail.com",
    "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
  );
  let product1 = new Product("1", "Dove", "shampoo", 17.9, 0, 0, 0, 0);
  let orderDetail1 = new OrderDetail(product1, 2);
  let order = new Order(client);
  order.addItem(orderDetail1);

  expect(order.getClientAddress()).toBe(
    "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
  );
  expect(order.getAmount()).toBe(35.8);
});
test("must not repeat item in input", async function () {
  let client = new Client("", "407.302.170-27", "", "");
  let product1 = new Product("1", "Dove", "shampoo", 17.9, 0, 0, 0, 0);
  let orderDetail1 = new OrderDetail(product1, 2);
  let orderDetail2 = new OrderDetail(product1, 2);
  let orderDetails = [orderDetail1, orderDetail2];
  let order = new Order(client);

  expect(() =>
    orderDetails.forEach((orderDetail) => {
      order.addItem(orderDetail);
    })
  ).toThrow(new Error("must not repeat item"));
});

test("Should created new order an order with 3 products and calculate the total value ", function () {
  let client = new Client(
    "Henrique Viccari",
    "407.302.170-27",
    "h.v@gmail.com",
    "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
  );
  let product1 = new Product("1", "Dove", "shampoo", 17.9, 0, 0, 0, 0);
  let product2 = new Product("2", "Dove", "condicionador", 22.9, 0, 0, 0, 0);
  let product3 = new Product(
    "3",
    "Natura",
    "sabonete maracujá",
    10.0,
    0,
    0,
    0,
    0
  );
  let orderDetail1 = new OrderDetail(product1, 2);
  let orderDetail2 = new OrderDetail(product2, 2);
  let orderDetail3 = new OrderDetail(product3, 2);
  let orderDetails = [orderDetail1, orderDetail2, orderDetail3];
  let order = new Order(client);
  orderDetails.forEach((orderDetail) => {
    order.addItem(orderDetail);
  });

  expect(order.getClientCpf()).toBe("407.302.170-27");
  expect(order.getClientAddress()).toBe(
    "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
  );
  expect(order.getAmount()).toBe(101.6);
});

test("Should create order and generate code", function () {
  let client = new Client("", "407.302.170-27", "", "");

  let product1 = new Product("1", "Dove", "shampoo", 17.9, 0, 0, 0, 0);
  let orderDetail1 = new OrderDetail(product1, 2);
  let order = new Order(client);
  order.addItem(orderDetail1);

  expect(order.code).toBe("202300000001");
});
