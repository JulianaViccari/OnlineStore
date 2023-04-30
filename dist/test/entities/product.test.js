"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../src/entities/product"));
test("should created new Product", function () {
    let productDove = new product_1.default("1", "Dove", "shampoo", 17.90);
    expect(productDove.getId()).toBe("1");
    expect(productDove.getDescription()).toBe("shampoo");
    expect(productDove.getName()).toBe("Dove");
    expect(productDove.getPrice()).toBe(17.90);
});
//# sourceMappingURL=product.test.js.map