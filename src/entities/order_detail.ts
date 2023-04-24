import Product from "./product";

export default class OrderDetail {
    private product: Product;
    private quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }

    getProductId(): string {
        return this.product.getId();
    }

    getProductName(): string {
        return this.product.getName();
    }

    getProductUnitPrice(): number {
        return this.product.getPrice();
    }

    getProductAmount(): number {
        return this.product.getPrice() * this.quantity;
    }
}