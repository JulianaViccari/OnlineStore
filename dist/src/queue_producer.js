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
const amqplib_1 = require("amqplib");
const order_detail_1 = __importDefault(require("./entities/order_detail"));
const product_1 = __importDefault(require("./entities/product"));
const input = {
    cpf: "",
    items: [],
    from: "",
    to: "",
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, amqplib_1.connect)("amqp://localhost");
        const channel = yield connection.createChannel();
        yield channel.assertQueue("checkout", { durable: true });
        input.cpf = "407.302,170-27";
        input.items.push(new order_detail_1.default(new product_1.default("1", "", "", 0), 2));
        input.items.push(new order_detail_1.default(new product_1.default("2", "", "", 0), 2));
        input.from = "14620000";
        input.to = "06445550";
        channel.sendToQueue("checkout", Buffer.from(JSON.stringify(input)));
    });
}
main();
//# sourceMappingURL=queue_producer.js.map