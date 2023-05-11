"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coupon {
    constructor(name, percent, quantity, validAt) {
        this.code = name;
        this.validAt = validAt;
        this.percent = percent;
        this.quantity = quantity;
    }
    getCode() {
        return this.code;
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