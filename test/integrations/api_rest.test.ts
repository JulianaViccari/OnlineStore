import axios from "axios";
import Product from "../../src/entities/product";
import OrderDetail from "../../src/entities/order_detail";

axios.defaults.validateStatus = function () {
  return true;
};

test("must not create an order with invalid CPF", async function () {
  const input = {
    cpf: "406.302.107-27",
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.message).toBe("Invalid cpf");
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
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(148);
});

test("must not repeat item in input", async function () {
  let products = [
    new Product("1", "Dove", "shampoo", 17.0, 0, 0, 0, 0),
    new Product("2", "Siege", "shampoo", 48.0, 0, 0, 0, 0),
    new Product("3", "Dove", "condicionador", 22.0, 0, 0, 0, 0),
  ];
  let listOrderDetails = [
    new OrderDetail(products[0], 2),
    new OrderDetail(products[1], 1),
    new OrderDetail(products[0], 1),
  ];
  const input = {
    cpf: "407.302.170-27",
    items: listOrderDetails,
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.message).toBe("must not repeat item");
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
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(118.4);
});

test("should make an order with three items with coupon invalid", async function () {
  let products = [
    new Product("2", "Siege", "shampoo", 48.0, 0, 0, 0, 0),
    new Product("3", "Dove", "condicionador", 22.0, 0, 0, 0, 0),
  ];
  let listOrderDetails = [
    new OrderDetail(products[0], 1),
    new OrderDetail(products[1], 3),
  ];

  const input = {
    cpf: "407.302.170-27",
    items: listOrderDetails,
    coupon: "discount",
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.message).toBe("Coupon invalid");
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
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.freight).toBe(6010);
  expect(output.subtotal).toBe(82);
  expect(output.total).toBe(6092);
});

test("must return a request through the code", async function () {
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
  const response = await axios.post("http://localhost:3000/checkout", input);
  const orderId = response.data.orderId;
  const respGetOrder = await axios.get(`http://localhost:3000/${orderId}`);
  expect(respGetOrder.status).toBe(200);
  expect(respGetOrder.data["id"]).toBe(orderId);
});
