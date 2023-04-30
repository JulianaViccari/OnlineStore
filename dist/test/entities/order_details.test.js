"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_detail_1 = __importDefault(require("../../src/entities/order_detail"));
const product_1 = __importDefault(require("../../src/entities/product"));
test("should created new OrderDetails", function () {
    let product = new product_1.default("1", "Dove", "shampoo", 17.90);
    let orderDetails = new order_detail_1.default(product, 2);
    expect(orderDetails.getProductName()).toBe("Dove");
    expect(orderDetails.getProductUnitPrice()).toBe(17.90);
    expect(orderDetails.getProductAmount()).toBe(35.80);
});
//# sourceMappingURL=order_details.test.js.map