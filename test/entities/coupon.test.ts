import Coupon from "../../src/entities/coupon"

test("should created new Coupon", function () {
    let today = new Date()
    let coupon = new Coupon("discount10", 5, 15, today);

    expect(coupon.getName()).toBe("discount10");
    expect(coupon.getValidAt().getDate()).toBe(today.getDate());
    expect(coupon.getPercent()).toBe(5);
    expect(coupon.getQuantity()).toBe(15);
})