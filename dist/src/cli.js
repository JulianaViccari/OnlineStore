"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkout_1 = __importDefault(require("./checkout"));
const coupon_in_memory_repository_1 = __importDefault(require("./repository/implementations/coupon_in_memory_repository"));
const email_in_memory_repository_1 = __importDefault(require("./repository/implementations/email_in_memory_repository"));
const order_detail_1 = __importDefault(require("./entities/order_detail"));
const product_1 = __importDefault(require("./entities/product"));
const product_in_memory_repository_1 = __importDefault(require("./repository/implementations/product_in_memory_repository"));
const input = {
    cpf: "",
    items: [],
    from: "",
    to: "",
};
process.stdin.on("data", function (data) {
    const command = data.toString().replace(/\n/g, "");
    if (command.startsWith("set-cpf")) {
        input.cpf = command.replace("set-cpf", "");
        console.log(input);
        return;
    }
    if (command.startsWith("add-item")) {
        const [idProduct, quantity] = command.replace("add-item ", "").split(" ");
        const orderDetail = new order_detail_1.default(new product_1.default(idProduct, "", "", 0), parseInt(quantity));
        input.items.push(orderDetail);
        console.log(input);
        return;
    }
    if (command.startsWith("set-from")) {
        input.from = command.replace("set-from", "");
        console.log(input);
        return;
    }
    if (command.startsWith("set-to")) {
        input.to = command.replace("set-to", "");
        console.log(input);
        return;
    }
    if (command.startsWith("checkout")) {
        try {
            const productsRepository = new product_in_memory_repository_1.default();
            const couponsRepository = new coupon_in_memory_repository_1.default();
            const emailGateway = new email_in_memory_repository_1.default();
            const output = new checkout_1.default(productsRepository, couponsRepository, emailGateway).execute(input);
            console.log(output);
            return;
        }
        catch (error) {
            console.log(error.message);
            return;
        }
    }
    if (command.startsWith("quit")) {
        process.exit(0);
    }
    console.log("Invalid command");
});
//# sourceMappingURL=cli.js.map