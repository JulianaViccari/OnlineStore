
import Product from "../../src/entities/product";
import SimulateFreight from "../../src/simulate_freight";

test("should simulate freight", async function () {
    let productDove = new Product("1", "Dove", "shampoo", 17.90, 5, 5, 5, 4);

    const resultFreigth = SimulateFreight.calculate(productDove);
    
    expect(resultFreigth).toBe(40);
});