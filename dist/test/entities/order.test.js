"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../src/entities/client"));
const order_1 = __importDefault(require("../../src/entities/order"));
const order_detail_1 = __importDefault(require("../../src/entities/order_detail"));
const product_1 = __importDefault(require("../../src/entities/product"));
test("Should created new order ", function () {
    let client = new client_1.default("Henrique Viccari", "67464608607", "h.v@gmail.com", "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    let product1 = new product_1.default("1", "Dove", "shampoo", 17.9);
    let orderDetail1 = new order_detail_1.default(product1, 2);
    let productList = [orderDetail1];
    let order = new order_1.default(productList, client);
    expect(order.getId()).toBe("1");
    expect(order.getClientCpf()).toBe("67464608607");
    expect(order.getClientAddress()).toBe("rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    expect(order.getAmount()).toBe(35.8);
});
test("Should created new order an order with 3 products and calculate the total value ", function () {
    let client = new client_1.default("Henrique Viccari", "67464608607", "h.v@gmail.com", "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    let product1 = new product_1.default("1", "Dove", "shampoo", 17.9);
    let product2 = new product_1.default("2", "Dove", "condicionador", 22.9);
    let product3 = new product_1.default("1", "Natura", "sabonete maracujá", 10.0);
    let orderDetail1 = new order_detail_1.default(product1, 2);
    let orderDetail2 = new order_detail_1.default(product2, 2);
    let orderDetail3 = new order_detail_1.default(product3, 2);
    let productList = [orderDetail1, orderDetail2, orderDetail3];
    let order = new order_1.default(productList, client);
    expect(order.getId()).toBe("1");
    expect(order.getClientCpf()).toBe("67464608607");
    expect(order.getClientAddress()).toBe("rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    expect(order.getAmount()).toBe(101.6);
});
//# sourceMappingURL=order.test.js.map