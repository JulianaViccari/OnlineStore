import SimulateFreight from "../../src/application/repository/simulate_freight";
import Product from "../../src/domain/entities/product";

test("should simulate freight", async function () {
  let productDove = new Product("1", "Dove", "shampoo", 17.9, 5, 5, 5, 4);

  const resultFreigth = SimulateFreight.calculate(productDove);

  expect(resultFreigth).toBe(40);
});
