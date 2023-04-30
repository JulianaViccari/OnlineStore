"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payment {
    constructor(paymentType, order, coupon) {
        this.paymentType = paymentType;
        this.order = order;
        this.coupon = coupon;
    }
    pay() {
        let percent = this.coupon.getPercent() / 100;
        let total = this.order.getAmount() - (this.order.getAmount() * percent);
        return total;
    }
}
exports.default = Payment;
//# sourceMappingURL=payment.js.map