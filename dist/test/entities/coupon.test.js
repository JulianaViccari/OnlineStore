"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coupon_1 = __importDefault(require("../../src/entities/coupon"));
test("should created new Coupon", function () {
    let today = new Date();
    let coupon = new coupon_1.default("discount10", 5, 15, today);
    expect(coupon.getCode()).toBe("discount10");
    expect(coupon.getValidAt().getDate()).toBe(today.getDate());
    expect(coupon.getPercent()).toBe(5);
    expect(coupon.getQuantity()).toBe(15);
});
//# sourceMappingURL=coupon.test.js.map