import axios from "axios";
import Product from "../src/entities/product";
import OrderDetail from "../src/entities/order_detail";
import Coupon from "../src/entities/coupon";

test('must not create an order with invalid CPF', async function () {
    const input = {
       cpf: "406.302.107-27" 
    };
   const response = await axios.post("http://localhost:3000/checkout", input)
   const output = response.data;
   expect(output.message).toBe("Invalid CPF");
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
   const response = await axios.post("http://localhost:3000/checkout", input)
   const output = response.data;
   expect(output.total).toBe(148);
});

test('should make an order with three items whith quantity negative', async function () {
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
   const response = await axios.post("http://localhost:3000/checkout", input)
   const output = response.data;
   expect(output.message).toBe("Product quantity cannot be negative");
});

// test('must not repeat item in input', async function () {
//     let products = [
//         new Product("1", "Dove", "shampoo", 17.00),
//         new Product("2", "Siege", "shampoo", 48.00),
//         new Product("3", "Dove", "condicionador", 22.00),
//     ];
//     let listOrderDetails = [
//         new OrderDetail(products[0], 2), 
//         new OrderDetail(products[1], 1),
//         new OrderDetail(products[0], 1),
//     ]
//     const input = {
//        cpf: "407.302.170-27",
//        items: listOrderDetails
//     };
//    const response = await axios.post("http://localhost:3000/checkout", input)
//    const output = response.data;
//    expect(output.message).toBe("must not repeat item");
// });


test('should make an order with three items whith coupon', async function () {
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
        coupon: "discount10",
    };
    const response = await axios.post("http://localhost:3000/checkout", input)
    const output = response.data;
    expect(output.total).toBe(133.2);
});

test('should make an order with three items whith coupon invalid', async function () {
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
       coupon: "discount5",
    };
   const response = await axios.post("http://localhost:3000/checkout", input)
   const output = response.data;
   expect(output.message).toBe("Coupon invalid");
});