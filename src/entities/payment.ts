import Coupon from "./coupon";
import Order from "./order";

export default class Payment {
    private paymentType: string;
    private order: Order;
    private coupon: Coupon;

    constructor(paymentType: string, order: Order, coupon: Coupon,) {
        this.paymentType = paymentType;
        this.order = order;
        this.coupon = coupon
    }

    pay(): number {
        let percent = this.coupon.getPercent() / 100;
        let total = this.order.getAmount() - (this.order.getAmount() * percent);
        return total;
    }
}