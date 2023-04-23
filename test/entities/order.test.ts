import Client from "../../src/entities/client";
import Order from "../../src/entities/order";
import OrderDetail from "../../src/entities/order_detail";
import Product from "../../src/entities/product";

test("Should created new order ", function () {
    let client = new Client(
        "Henrique Viccari",
        "67464608607",
        "h.v@gmail.com",
        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp")
    let product1 = new Product("1", "Dove", "shampoo", 17.90);
    let orderDetail1 = new OrderDetail(product1, 2);
    let productList = [orderDetail1];
    let order = new Order("1", client, productList);

    expect(order.getId()).toBe("1");
    expect(order.getClientCpf()).toBe("67464608607");
    expect(order.getClientAddress()).toBe(
        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    expect(order.getAmount()).toBe(35.8);

})

test("Should created new order an order with 3 products and calculate the total value ", function () {
    let client = new Client(
        "Henrique Viccari",
        "67464608607",
        "h.v@gmail.com",
        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp")
    let product1 = new Product("1", "Dove", "shampoo", 17.90);
    let product2 = new Product("2", "Dove", "condicionador", 22.90);
    let product3 = new Product("1", "Natura", "sabonete maracujá", 10.00);
    let orderDetail1 = new OrderDetail(product1, 2);
    let orderDetail2 = new OrderDetail(product2, 2);
    let orderDetail3 = new OrderDetail(product3, 2);
    let productList = [orderDetail1, orderDetail2, orderDetail3];
    let order = new Order("1", client, productList);

    expect(order.getId()).toBe("1");
    expect(order.getClientCpf()).toBe("67464608607");
    expect(order.getClientAddress()).toBe(
        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    expect(order.getAmount()).toBe(101.6);

})