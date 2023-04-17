import Coupon from "../src/coupon"

test("should created new Coupon", function () {
    let today = new Date()
    let coupon = new Coupon("discount10", today, 5, 15);

    expect(coupon.getName()).toBe("discount10");
    expect(coupon.getValidAt().getDate()).toBe(today.getDate());
    expect(coupon.getPercent()).toBe(5);
    expect(coupon.getQuantity()).toBe(15);
})