import Product from "../../../src/entities/product";

test("should created new Product", function () {
  let productDove = new Product("1", "Dove", "shampoo", 17.9, 0, 0, 0, 0);

  expect(productDove.getId()).toBe("1");
  expect(productDove.getDescription()).toBe("shampoo");
  expect(productDove.getName()).toBe("Dove");
  expect(productDove.getPrice()).toBe(17.9);
  expect(productDove.getPrice()).toBe(17.9);
  expect(productDove.getPrice()).toBe(17.9);
});

test("should calculate volume", function () {
  let productDove = new Product("1", "Dove", "shampoo", 17.9, 5, 5, 5, 4);

  expect(productDove.getVolume()).toBe(0.000125);
});

test("should calculate density", function () {
  let productDove = new Product("1", "Dove", "shampoo", 17.9, 5, 5, 5, 4);

  expect(productDove.getDensity()).toBe(32000);
});

test("should not created new Product with dimensions invalids", function () {
  expect(
    () => new Product("1", "Dove", "shampoo", 17.9, -100, -10, -10, 0)
  ).toThrow(new Error("Invalid dimensions"));
});

test("should not created new Product with weight invalids", function () {
  expect(
    () => new Product("1", "Dove", "shampoo", 17.9, 100, 10, 10, -90)
  ).toThrow(new Error("Invalid weight"));
});
