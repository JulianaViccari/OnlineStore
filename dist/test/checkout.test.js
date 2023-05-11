"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../src/entities/product"));
const order_detail_1 = __importDefault(require("../src/entities/order_detail"));
const checkout_1 = __importDefault(require("../src/checkout"));
const product_in_memory_repository_1 = __importDefault(require("../src/repository/implementations/product_in_memory_repository"));
const coupon_in_memory_repository_1 = __importDefault(require("../src/repository/implementations/coupon_in_memory_repository"));
const email_in_memory_repository_1 = __importDefault(require("../src/repository/implementations/email_in_memory_repository"));
const sinon_1 = __importDefault(require("sinon"));
let checkout;
beforeEach(() => {
    const productsRepository = new product_in_memory_repository_1.default();
    const couponsRepository = new coupon_in_memory_repository_1.default();
    const emailGateway = new email_in_memory_repository_1.default();
    checkout = new checkout_1.default(productsRepository, couponsRepository, emailGateway);
});
test("must not create an order with invalid CPF", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            cpf: "406.302.107-27",
            items: [],
        };
        expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid CPF"));
    });
});
test("must create an order with email", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [
            new product_1.default("1", "Dove", "shampoo", 17.0),
            new product_1.default("2", "Siege", "shampoo", 48.0),
            new product_1.default("3", "Dove", "condicionador", 22.0),
        ];
        let listOrderDetails = [
            new order_detail_1.default(products[0], 2),
            new order_detail_1.default(products[1], 1),
            new order_detail_1.default(products[2], 3),
        ];
        const input = {
            cpf: "407.302.170-27",
            items: listOrderDetails,
            email: "teste.1@gmail.com",
        };
        const output = yield checkout.execute(input);
        expect(output.total).toBe(148);
    });
});
test("must create an order with email", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const productsRepositoryStub = sinon_1.default
            .stub(product_in_memory_repository_1.default.prototype, "get")
            .resolves(new product_1.default("1", "Dove", "shampoo", 9.0));
        let products = [new product_1.default("1", "Dove", "shampoo", 17.0)];
        let listOrderDetails = [new order_detail_1.default(products[0], 2)];
        const input = {
            cpf: "407.302.170-27",
            items: listOrderDetails,
        };
        const output = yield checkout.execute(input);
        expect(output.total).toBe(18);
        productsRepositoryStub.restore();
    });
});
test("should make an order with three items", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [
            new product_1.default("1", "Dove", "shampoo", 17.0),
            new product_1.default("2", "Siege", "shampoo", 48.0),
            new product_1.default("3", "Dove", "condicionador", 22.0),
        ];
        let listOrderDetails = [
            new order_detail_1.default(products[0], 2),
            new order_detail_1.default(products[1], 1),
            new order_detail_1.default(products[2], 3),
        ];
        const input = {
            cpf: "407.302.170-27",
            items: listOrderDetails,
        };
        const output = yield checkout.execute(input);
        expect(output.total).toBe(148);
    });
});
test("should make an order with three items with quantity negative", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [
            new product_1.default("1", "Dove", "shampoo", 17.0),
            new product_1.default("2", "Siege", "shampoo", 48.0),
            new product_1.default("3", "Dove", "condicionador", 22.0),
        ];
        let listOrderDetails = [
            new order_detail_1.default(products[0], 2),
            new order_detail_1.default(products[1], 1),
            new order_detail_1.default(products[2], -2),
        ];
        const input = {
            cpf: "407.302.170-27",
            items: listOrderDetails,
        };
        expect(() => checkout.execute(input)).rejects.toThrow(new Error("Product quantity cannot be negative"));
    });
});
test("must not repeat item in input", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [
            new product_1.default("1", "Dove", "shampoo", 17.0),
            new product_1.default("2", "Siege", "shampoo", 48.0),
            new product_1.default("3", "Dove", "condicionador", 22.0),
        ];
        let listOrderDetails = [
            new order_detail_1.default(products[0], 2),
            new order_detail_1.default(products[1], 1),
            new order_detail_1.default(products[0], 1),
        ];
        const input = {
            cpf: "407.302.170-27",
            items: listOrderDetails,
        };
        expect(() => checkout.execute(input)).rejects.toThrow(new Error("must not repeat item"));
    });
});
test("should make an order with three items with coupon", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [
            new product_1.default("1", "Dove", "shampoo", 17.0),
            new product_1.default("2", "Siege", "shampoo", 48.0),
            new product_1.default("3", "Dove", "condicionador", 22.0),
        ];
        let listOrderDetails = [
            new order_detail_1.default(products[0], 2),
            new order_detail_1.default(products[1], 1),
            new order_detail_1.default(products[2], 3),
        ];
        const input = {
            cpf: "407.302.170-27",
            items: listOrderDetails,
            coupon: "discount20",
        };
        const output = yield checkout.execute(input);
        expect(output.total).toBe(118.4);
    });
});
test("should make an order with three items with coupon invalid", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [
            new product_1.default("1", "Dove", "shampoo", 17.0),
            new product_1.default("2", "Siege", "shampoo", 48.0),
            new product_1.default("3", "Dove", "condicionador", 22.0),
        ];
        let listOrderDetails = [
            new order_detail_1.default(products[0], 2),
            new order_detail_1.default(products[1], 1),
            new order_detail_1.default(products[2], 3),
        ];
        const input = {
            cpf: "407.302.170-27",
            items: listOrderDetails,
            coupon: "discount",
        };
        expect(() => checkout.execute(input)).rejects.toThrow(new Error("Coupon invalid"));
    });
});
test("should make an order with three items with shipment", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [
            new product_1.default("1", "Dove", "shampoo", 17.0),
            new product_1.default("2", "Siege", "shampoo", 48.0),
        ];
        let listOrderDetails = [
            new order_detail_1.default(products[0], 2),
            new order_detail_1.default(products[1], 1),
        ];
        const input = {
            cpf: "407.302.170-27",
            items: listOrderDetails,
            from: "14620000",
            to: "06445550", //cep destino
        };
        const output = yield checkout.execute(input);
        expect(output.freight).toBe(6010);
        expect(output.subtotal).toBe(82);
        expect(output.total).toBe(6092);
    });
});
test("should not create order if product's dimensions has negative values", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [
            new product_1.default("1", "Dove", "shampoo", 17.0),
            new product_1.default("4", "Lux", "sabonete", 2.0),
        ];
        let listOrderDetails = [
            new order_detail_1.default(products[0], 2),
            new order_detail_1.default(products[1], 1),
        ];
        const input = {
            cpf: "407.302.170-27",
            items: listOrderDetails,
            from: "14620000",
            to: "06445550", //cep destino
        };
        expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid dimensions"));
    });
});
//# sourceMappingURL=checkout.test.js.map