import Payment from "../src/payment"
import Client from "../src/client";
import Order from "../src/order";
import OrderDetail from "../src/order_detail";
import Product from "../src/product";
import Coupon from "../src/coupon"

test("should created new Payment", function() {
    let client = new Client(
        "Henrique Viccari", 
        "67464608607", 
        "h.v@gmail.com", 
        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp")
    let product = new Product("1", "Dove", "shampoo", 17.90);
    let orderDetail = new OrderDetail(product, 2);
    let productList = [orderDetail];
    let today = new Date()
    let coupon = new Coupon("discount10", today, 5, 15);
    let order = new Order("1", client, productList );
    let payment = new Payment("Débito", order, coupon);

    expect(payment.pay()).toBe(34.01)
})

test("Should created new order an order with 3 products, associate a discount coupon and calculate the total", function () {
    let client = new Client(
        "Henrique Viccari", 
        "67464608607", 
        "h.v@gmail.com", 
        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp")
    let today = new Date()
    let coupon = new Coupon("discount10", today, 5, 15);
    let product1 = new Product("1", "Dove", "shampoo", 17.90);
    let product2 = new Product("2", "Dove", "condicionador", 22.90);
    let product3 = new Product("1", "Natura", "sabonete maracujá", 10.00);
    let orderDetail1 = new OrderDetail(product1, 2);
    let orderDetail2 = new OrderDetail(product2, 2);
    let orderDetail3 = new OrderDetail(product3, 2);
    let productList = [orderDetail1, orderDetail2, orderDetail3];
    let order = new Order("1", client, productList )
    let payment = new Payment("Débito", order, coupon);

    expect(order.getAmount()).toBe(101.6);
    expect(payment.pay()).toBe(96.52);

})