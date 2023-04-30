"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, client, productList) {
        this.id = id;
        this.client = client;
        this.productList = productList;
    }
    getId() {
        return this.id;
    }
    getClientCpf() {
        return this.client.getCpf();
    }
    getClientAddress() {
        return this.client.getAddress();
    }
    getAmount() {
        let total = 0;
        this.productList.forEach(orderDetail => {
            total += orderDetail.getProductAmount();
        });
        return total;
    }
}
exports.default = Order;
//# sourceMappingURL=order.js.map