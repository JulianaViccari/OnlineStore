"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = __importDefault(require("../../src/entities/payment"));
const client_1 = __importDefault(require("../../src/entities/client"));
const order_1 = __importDefault(require("../../src/entities/order"));
const order_detail_1 = __importDefault(require("../../src/entities/order_detail"));
const product_1 = __importDefault(require("../../src/entities/product"));
const coupon_1 = __importDefault(require("../../src/entities/coupon"));
test("should created new Payment", function () {
    let client = new client_1.default("Henrique Viccari", "67464608607", "h.v@gmail.com", "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    let product = new product_1.default("1", "Dove", "shampoo", 17.90);
    let orderDetail = new order_detail_1.default(product, 2);
    let productList = [orderDetail];
    let today = new Date();
    let coupon = new coupon_1.default("discount10", 5, 15, today);
    let order = new order_1.default("1", client, productList);
    let payment = new payment_1.default("Débito", order, coupon);
    expect(payment.pay()).toBe(34.01);
});
test("Should created new order an order with 3 products, associate a discount coupon and calculate the total", function () {
    let client = new client_1.default("Henrique Viccari", "67464608607", "h.v@gmail.com", "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    let today = new Date();
    let coupon = new coupon_1.default("discount10", 5, 15, today);
    let product1 = new product_1.default("1", "Dove", "shampoo", 17.90);
    let product2 = new product_1.default("2", "Dove", "condicionador", 22.90);
    let product3 = new product_1.default("1", "Natura", "sabonete maracujá", 10.00);
    let orderDetail1 = new order_detail_1.default(product1, 2);
    let orderDetail2 = new order_detail_1.default(product2, 2);
    let orderDetail3 = new order_detail_1.default(product3, 2);
    let productList = [orderDetail1, orderDetail2, orderDetail3];
    let order = new order_1.default("1", client, productList);
    let payment = new payment_1.default("Débito", order, coupon);
    expect(order.getAmount()).toBe(101.6);
    expect(payment.pay()).toBe(96.52);
});
//# sourceMappingURL=payment.test.js.map