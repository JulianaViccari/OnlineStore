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
const express_1 = __importDefault(require("express"));
const checkout_1 = __importDefault(require("./checkout"));
const product_in_memory_repository_1 = __importDefault(require("./repository/implementations/product_in_memory_repository"));
const coupon_in_memory_repository_1 = __importDefault(require("./repository/implementations/coupon_in_memory_repository"));
const email_in_memory_repository_1 = __importDefault(require("./repository/implementations/email_in_memory_repository"));
const order_1 = __importDefault(require("./entities/order"));
const order_mysql_repository_1 = __importDefault(require("./repository/implementations/order_mysql_repository"));
const client_1 = __importDefault(require("./entities/client"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const orders: Array<Order> = [];
// function getOrderById(orderId: string): Array<Order> {
//   return orders.filter((o) => o.getId() === orderId);
// }
// function getOrder(): Array<Order> {
//   return orders;
// }
app.post("/checkout", function (req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productsRepository = new product_in_memory_repository_1.default();
            const couponsRepository = new coupon_in_memory_repository_1.default();
            const emailGateway = new email_in_memory_repository_1.default();
            const orderRepository = new order_mysql_repository_1.default();
            let output = yield new checkout_1.default(productsRepository, couponsRepository, emailGateway).execute(req.body);
            const order = new order_1.default(req.body.items, new client_1.default("", req.body.cpf, "", ""));
            yield orderRepository.create(order);
            output.orderId = order.getId();
            resp.json(output);
        }
        catch (error) {
            resp.status(422).json({
                message: error.message,
            });
        }
    });
});
app.get("/:orderId", function (req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield new order_mysql_repository_1.default().getById(req.params["orderId"]);
        resp.send(order);
    });
});
app.get("/", function (req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield new order_mysql_repository_1.default().getAll();
        resp.send(orders);
    });
});
app.listen(3000);
//# sourceMappingURL=api_rest.js.map