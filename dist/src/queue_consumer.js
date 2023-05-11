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
const checkout_1 = __importDefault(require("./checkout"));
const coupon_in_memory_repository_1 = __importDefault(require("./repository/implementations/coupon_in_memory_repository"));
const email_in_memory_repository_1 = __importDefault(require("./repository/implementations/email_in_memory_repository"));
const product_in_memory_repository_1 = __importDefault(require("./repository/implementations/product_in_memory_repository"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, amqplib_1.connect)("amqp://localhost");
        const channel = yield connection.createChannel();
        yield channel.assertQueue("checkout", { durable: true });
        channel.consume("checkout", function (msg) {
            const input = JSON.parse(msg.content.toString());
            try {
                const productsRepository = new product_in_memory_repository_1.default();
                const couponsRepository = new coupon_in_memory_repository_1.default();
                const emailGateway = new email_in_memory_repository_1.default();
                const output = new checkout_1.default(productsRepository, couponsRepository, emailGateway).execute(input);
                console.log(output);
                channel.ack(msg);
            }
            catch (error) {
                console.log(error);
            }
        });
    });
}
main();
//# sourceMappingURL=queue_consumer.js.map