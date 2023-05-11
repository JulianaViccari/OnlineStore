"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(productList, client) {
        this.id = `${new Date().getFullYear()}${Math.floor(Math.random() * 10000 + 1)
            .toString()
            .padStart(8, "0")}`;
        this.client = client;
        this.orderDetails = productList;
    }
    getId() {
        return this.id;
    }
    getClientCpf() {
        return this.client === undefined ? "null" : this.client.getCpf();
    }
    getClientAddress() {
        return this.client === undefined ? "null" : this.client.getAddress();
    }
    getAmount() {
        let total = 0;
        this.orderDetails.forEach((orderDetail) => {
            total += orderDetail.getProductAmount();
        });
        return total;
    }
}
exports.default = Order;
//# sourceMappingURL=order.js.map