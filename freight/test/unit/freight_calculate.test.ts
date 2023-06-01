import FreightCalculator from "../../src/domain/freight_calculator";

test("should simulate freight", async function () {
  let distance = 1000;
  let productDove = { volume: 0.03, density: 100, quantity: 1 };

  const resultFreigth = FreightCalculator.calculate(productDove, distance);

  expect(resultFreigth).toBe(30);
});
