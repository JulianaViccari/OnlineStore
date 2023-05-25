import OrderDetail from "../../../src/domain/entities/order_detail";
import Product from "../../../src/domain/entities/product";

test("should created new OrderDetails", function () {
  let product = new Product("1", "Dove", "shampoo", 17.9, 0, 0, 0, 0);
  let orderDetails = new OrderDetail(product, 2);

  expect(orderDetails.getProductName()).toBe("Dove");
  expect(orderDetails.getProductUnitPrice()).toBe(17.9);
  expect(orderDetails.getProductAmount()).toBe(35.8);
});

test("should not created OrderDetails invalid quantities", function () {
  let product = new Product("1", "Dove", "shampoo", 17.9, 0, 0, 0, 0);
  expect(() => new OrderDetail(product, 0)).toThrow(
    new Error("Product quantity cannot be negative")
  );
});
