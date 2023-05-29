import SimulateFreight from "../../src/domain/entities/freight_calculator";

test("should simulate freight", async function () {
  let productDove = { volume: 0.03, density: 100, quantity: 1};

  const resultFreigth = SimulateFreight.calculate(productDove);

  expect(resultFreigth).toBe(30);
});
