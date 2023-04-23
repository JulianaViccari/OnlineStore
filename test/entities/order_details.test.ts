import OrderDetail from "../../src/entities/order_detail";
import Product from "../../src/entities/product";

test("should created new OrderDetails", function () {
    let product = new Product("1", "Dove", "shampoo", 17.90);
    let orderDetails = new OrderDetail(product, 2)

    expect(orderDetails.getProductName()).toBe("Dove");
    expect(orderDetails.getProductUnitPrice()).toBe(17.90);
    expect(orderDetails.getProductAmount()).toBe(35.80)
})