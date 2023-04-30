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
const cpf_validation_1 = require("./cpf_validation");
const product_1 = __importDefault(require("./entities/product"));
const coupon_1 = __importDefault(require("./entities/coupon"));
const app = (0, express_1.default)();
const productsDB = [
    new product_1.default("1", "Dove", "shampoo", 17.00, 8, 20, 20, 300),
    new product_1.default("2", "Siege", "shampoo", 48.00, 8, 20, 20, 1),
    new product_1.default("3", "Dove", "condicionador", 22.00, 8, 20, 20, 300),
    new product_1.default("4", "Lux", "sabonete", 2.00, 8, 20, 20, -3),
];
const couponsDB = [
    new coupon_1.default("discount10", 10, 15, new Date(2023, 3, 24, 23, 47, 0, 0)),
    new coupon_1.default("discount20", 20, 15, new Date(2023, 6, 24, 23, 47, 0, 0)),
    new coupon_1.default("discount5", 5, 15, new Date(2023, 0, 24, 23, 47, 0, 0))
];
function getProductById(products, id) {
    return products.filter(p => p.getId() === id)[0];
}
;
function getCouponByName(coupons, name) {
    return coupons.filter(c => c.getName() === name)[0];
}
;
function hasDuplicateId(details) {
    try {
        let seen = new Set();
        details.forEach(detail => {
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
    const volume = product.width / 100 * product.height / 100 * product.length / 100;
    const density = product.weight / volume;
    return volume * 1000 * (density / 100);
}
function hasNegativeDimensions(product) {
    return product.getHeight() < 0
        || product.getLength() < 0
        || product.getWeight() < 0
        || product.getWidth() < 0;
}
app.use(express_1.default.json());
app.post("/checkout", function (req, resp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((0, cpf_validation_1.validate)(req.body.cpf)) {
                const connectionProducts = productsDB;
                const output = {
                    total: 0,
                    freight: 0,
                    subtotal: 0,
                };
                if (req.body.items) {
                    if (hasDuplicateId(req.body.items))
                        throw new Error("must not repeat item");
                    for (const item of req.body.items) {
                        let product = getProductById(connectionProducts, item.product.id);
                        if (hasNegativeDimensions(product))
                            throw new Error("Invalid dimensions");
                        if (item.quantity <= 0)
                            throw new Error("Product quantity cannot be negative");
                        if (product !== undefined) {
                            output.subtotal += product.getPrice() * item.quantity;
                        }
                        if (req.body.from && req.body.to) {
                            const freight = calculateFreight(product);
                            output.freight += Math.max(10, freight) * item.quantity;
                        }
                    }
                    ;
                }
                ;
                output.total = output.subtotal;
                if (req.body.coupon) {
                    const connectionCoupon = couponsDB;
                    let coupon = getCouponByName(connectionCoupon, req.body.coupon);
                    if (coupon !== undefined && (new Date().getTime() <= coupon.getValidAt().getTime())) {
                        const couponPercent = coupon.getPercent();
                        output.total -= (output.total * couponPercent) / 100;
                    }
                    else {
                        resp.json({
                            message: "Coupon invalid"
                        });
                        return;
                    }
                    ;
                }
                ;
                output.total += output.freight;
                resp.json(output);
            }
            else {
                resp.json({
                    message: "Invalid CPF"
                });
            }
        }
        catch (error) {
            resp.status(422).json({
                message: error.message
            });
        }
    });
});
app.listen(3000);
//# sourceMappingURL=api_rest.js.map