import Product from "../../src/entities/product"

test("should created new Product", function () {
    let productDove = new Product("1", "Dove", "shampoo", 17.90);

    expect(productDove.getId()).toBe("1");
    expect(productDove.getDescription()).toBe("shampoo");
    expect(productDove.getName()).toBe("Dove")
    expect(productDove.getPrice()).toBe(17.90)
})