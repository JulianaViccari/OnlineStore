"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderDetail {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    getProductId() {
        return this.product.getId();
    }
    getProductName() {
        return this.product.getName();
    }
    getProductUnitPrice() {
        return this.product.getPrice();
    }
    getProductAmount() {
        return this.product.getPrice() * this.quantity;
    }
}
exports.default = OrderDetail;
//# sourceMappingURL=order_detail.js.map