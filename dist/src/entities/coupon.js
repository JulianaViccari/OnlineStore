"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coupon {
    constructor(name, percent, quantity, validAt) {
        this.name = name;
        this.validAt = validAt;
        this.percent = percent;
        this.quantity = quantity;
    }
    getName() {
        return this.name;
    }
    getValidAt() {
        return this.validAt;
    }
    getPercent() {
        return this.percent;
    }
    getQuantity() {
        return this.quantity;
    }
}
exports.default = Coupon;
//# sourceMappingURL=coupon.js.map