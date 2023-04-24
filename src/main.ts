import express, { Request, Response } from "express";
import { validate } from "./cpf_validation";
import Product from "./entities/product";
import Coupon from "./entities/coupon";
import OrderDetail from "./entities/order_detail";
const app = express();

const productsDB = [
    new Product("1", "Dove", "shampoo", 17.00),
    new Product("2", "Siege", "shampoo", 48.00),
    new Product("3", "Dove", "condicionador", 22.00),
];

const couponsDB = [
    new Coupon("discount10", 10, 15, new Date(2023, 3, 24, 23, 47, 0, 0)),
    new Coupon("discount20", 20, 15, new Date(2023, 6, 24, 23, 47, 0, 0)),
    new Coupon("discount5", 5, 15, new Date(2023, 0, 24, 23, 47, 0, 0))
];

function getProductById(products: Array<Product>, id: string): Product {
    return products.filter(p => p.getId() === id)[0];
};

function getCouponByName(coupons: Array<Coupon>, name: string): Coupon | undefined {
    return coupons.filter(c => c.getName() === name)[0];
};

function hasDuplicateId(details: Array<OrderDetail>): boolean {
    let seen = new Set();
    return details.some(function (detail) {
        console.log(seen.size, seen.add(detail.getProductId).size)
        return seen.size === seen.add(detail.getProductId).size
    });
}


app.use(express.json());
app.post("/checkout", async function (req: Request, resp: Response) {
    if (validate(req.body.cpf)) {
        const connectionProducts = productsDB;
        const output = {
            total: 0
        };
        if (req.body.items) {
            // if (hasDuplicateId(req.body.items)) return resp.json({ message: "must not repeat item" });
            for (const item of req.body.items) {
                let product = getProductById(connectionProducts, item.product.id);
                if (item.quantity < 0) return resp.json({ message: "Product quantity cannot be negative" });
                if (product !== undefined) {
                    output.total += product.getPrice() * item.quantity;
                }
            }
        };
        if (req.body.coupon) {
            const connectionCoupon = couponsDB;
            let coupon = getCouponByName(connectionCoupon, req.body.coupon);
            if (coupon === undefined) return resp.json({ message: "Coupon invalid" })
            if (new Date() <= coupon.getValidAt()) {
                const couponPercent = coupon.getPercent();
                output.total -= (output.total * couponPercent) / 100;
            } else {
                resp.json({
                    message: "Coupon invalid"
                })
                return;
            };
        };
        resp.json(output);
    } else {
        resp.json({
            message: "Invalid CPF"
        })
    };
});
app.listen(3000);