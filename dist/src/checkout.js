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
Object.defineProperty(exports, "__esModule", { value: true });
const cpf_validation_1 = require("./cpf_validation");
function hasDuplicateId(details) {
    try {
        let seen = new Set();
        details.forEach((detail) => {
            seen.add(detail.product.id);
        });
        return seen.size !== details.length;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
function calculateFreight(product) {
    const volume = ((((product.width / 100) * product.height) / 100) * product.length) / 100;
    const density = product.weight / volume;
    return volume * 1000 * (density / 100);
}
function hasNegativeDimensions(product) {
    return (product.getHeight() < 0 ||
        product.getLength() < 0 ||
        product.getWeight() < 0 ||
        product.getWidth() < 0);
}
class Checkout {
    constructor(productRepository, couponRepository, emailGateway) {
        this.productRepository = productRepository;
        this.couponRepository = couponRepository;
        this.emailGateway = emailGateway;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = {
                orderId: "",
                subtotal: 0,
                freight: 0,
                total: 0,
            };
            try {
                if ((0, cpf_validation_1.validate)(input.cpf)) {
                    if (input.items) {
                        if (hasDuplicateId(input.items))
                            throw new Error("must not repeat item");
                        for (const item of input.items) {
                            let product = yield this.productRepository.get(item.product.id);
                            if (hasNegativeDimensions(product))
                                throw new Error("Invalid dimensions");
                            if (item.quantity <= 0)
                                throw new Error("Product quantity cannot be negative");
                            if (product !== undefined) {
                                output.subtotal += product.getPrice() * item.quantity;
                            }
                            if (input.from && input.to) {
                                const freight = calculateFreight(product);
                                output.freight += Math.max(10, freight) * item.quantity;
                            }
                        }
                    }
                    output.total = output.subtotal;
                    if (input.coupon) {
                        const coupon = yield this.couponRepository.get(input.coupon);
                        if (coupon !== undefined &&
                            new Date().getTime() <= coupon.getValidAt().getTime()) {
                            const couponPercent = coupon.getPercent();
                            output.total -= (output.total * couponPercent) / 100;
                        }
                        else {
                            throw new Error("Coupon invalid");
                        }
                    }
                    output.total += output.freight;
                    if (input.email) {
                        yield this.emailGateway.send("Purchase Sucess", "...", input.email, "test@gmail.com");
                    }
                    return output;
                }
                else {
                    throw new Error("Invalid CPF");
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = Checkout;
//# sourceMappingURL=checkout.js.map