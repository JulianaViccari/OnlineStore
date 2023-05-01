import Product from "../src/entities/product";
import OrderDetail from "../src/entities/order_detail";
import Checkout from "../src/checkout";
import ProductInMemoryRepository from "../src/product_in_memory_repository";
import CouponInMemoryRepository from "../src/coupon_in_memory_repository";
import EmailInMemoryRepository from "../src/email_in_memory_repository";

let checkout: Checkout;

beforeEach(() => {
    const productsRepository = new ProductInMemoryRepository();
    const couponsRepository = new CouponInMemoryRepository();
    const emailGateway = new EmailInMemoryRepository()

    checkout = new Checkout(productsRepository, couponsRepository, emailGateway);
})

test('must not create an order with invalid CPF', async function () {
    const input = {
       cpf: "406.302.107-27",
       items: [],
    };
   
   expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid CPF"));
});

test('must create an order with email', async function () {
       let products = [
        new Product("1", "Dove", "shampoo", 17.00),
        new Product("2", "Siege", "shampoo", 48.00),
        new Product("3", "Dove", "condicionador", 22.00),
    ];
    let listOrderDetails = [
        new OrderDetail(products[0], 2), 
        new OrderDetail(products[1], 1),
        new OrderDetail(products[2], 3),
    ]
    const input = {
       cpf: "407.302.170-27",
       items: listOrderDetails,
       email: "teste.1@gmail.com"
    };

    const output = await checkout.execute(input);
   expect(output.total).toBe(148);
});
test('should make an order with three items', async function () {
    let products = [
        new Product("1", "Dove", "shampoo", 17.00),
        new Product("2", "Siege", "shampoo", 48.00),
        new Product("3", "Dove", "condicionador", 22.00),
    ];
    let listOrderDetails = [
        new OrderDetail(products[0], 2), 
        new OrderDetail(products[1], 1),
        new OrderDetail(products[2], 3),
    ]
    const input = {
       cpf: "407.302.170-27",
       items: listOrderDetails
    };

    const output = await checkout.execute(input);
   expect(output.total).toBe(148);
});

test('should make an order with three items with quantity negative', async function () {
    let products = [
        new Product("1", "Dove", "shampoo", 17.00),
        new Product("2", "Siege", "shampoo", 48.00),
        new Product("3", "Dove", "condicionador", 22.00),
    ];
    let listOrderDetails = [
        new OrderDetail(products[0], 2), 
        new OrderDetail(products[1], 1),
        new OrderDetail(products[2], -2),
    ]
    const input = {
       cpf: "407.302.170-27",
       items: listOrderDetails
    };
    expect(() => checkout.execute(input)).rejects.toThrow(new Error("Product quantity cannot be negative"));
});

test('must not repeat item in input', async function () {
    let products = [
        new Product("1", "Dove", "shampoo", 17.00),
        new Product("2", "Siege", "shampoo", 48.00),
        new Product("3", "Dove", "condicionador", 22.00),
    ];
    let listOrderDetails = [
        new OrderDetail(products[0], 2), 
        new OrderDetail(products[1], 1),
        new OrderDetail(products[0], 1),
    ]
    const input = {
       cpf: "407.302.170-27",
       items: listOrderDetails
    };
    expect(() => checkout.execute(input)).rejects.toThrow(new Error("must not repeat item"));
});

test('should make an order with three items with coupon', async function () {
    let products = [
        new Product("1", "Dove", "shampoo", 17.00),
        new Product("2", "Siege", "shampoo", 48.00),
        new Product("3", "Dove", "condicionador", 22.00),
    ];
    let listOrderDetails = [
        new OrderDetail(products[0], 2),
        new OrderDetail(products[1], 1),
        new OrderDetail(products[2], 3),
    ];
    const input = {
        cpf: "407.302.170-27",
        items: listOrderDetails,
        coupon: "discount20",
    };
    const output = await checkout.execute(input);
    expect(output.total).toBe(118.4);
});

test('should make an order with three items with coupon invalid', async function () {
    let products = [
        new Product("1", "Dove", "shampoo", 17.00),
        new Product("2", "Siege", "shampoo", 48.00),
        new Product("3", "Dove", "condicionador", 22.00),
    ];
    let listOrderDetails = [
        new OrderDetail(products[0], 2), 
        new OrderDetail(products[1], 1),
        new OrderDetail(products[2], 3),
    ];

    const input = {
       cpf: "407.302.170-27",
       items: listOrderDetails,
       coupon: "discount",
    };
    expect(() => checkout.execute(input)).rejects.toThrow(new Error("Coupon invalid"));
});

test('should make an order with three items with shipment', async function () {
    let products = [
        new Product("1", "Dove", "shampoo", 17.00),
        new Product("2", "Siege", "shampoo", 48.00),
    ];
    let listOrderDetails = [
        new OrderDetail(products[0], 2), 
        new OrderDetail(products[1], 1),
    ];

    const input = {
       cpf: "407.302.170-27",
       items: listOrderDetails,
       from: "14620000", //cep origem
       to: "06445550", //cep destino
    };
    const output = await checkout.execute(input);
    expect(output.freight).toBe(6010);
    expect(output.subtotal).toBe(82);
    expect(output.total).toBe(6092);
});

test('should not create order if product\'s dimensions has negative values', async function () {
    let products = [
        new Product("1", "Dove", "shampoo", 17.00),
        new Product("4", "Lux", "sabonete", 2.00),
    ];
    let listOrderDetails = [
        new OrderDetail(products[0], 2), 
        new OrderDetail(products[1], 1),
    ];

    const input = {
       cpf: "407.302.170-27",
       items: listOrderDetails,
       from: "14620000", //cep origem
       to: "06445550", //cep destino
    };
    expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid dimensions"));
});

