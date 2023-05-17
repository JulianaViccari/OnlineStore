import Coupon from "../../../src/entities/coupon";

test("should created new Coupon", function () {
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 30);

  let coupon = new Coupon("discount10", 5, 15, expireDate);

  expect(coupon.getCode()).toBe("discount10");
  expect(coupon.isValid()).toBe(true);
  expect(coupon.getPercent()).toBe(5);
  expect(coupon.getQuantity()).toBe(15);
});

test("should verify coupon is invalid ", function () {
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 30);
  let coupon = new Coupon("discount10", 5, 15, expireDate);
  expect(coupon.isValid()).toBe(false);
});

test("should calculate discount ", function () {
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 30);

  const coupon = new Coupon("discount10", 10, 5, expireDate);

  expect(coupon.calculateDiscount(1000)).toBe(100);
});
