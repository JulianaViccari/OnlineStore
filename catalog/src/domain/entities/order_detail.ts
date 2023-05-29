import Product from "./product";

export default class OrderDetail {
  private product: Product;
  private quantity: number;

  constructor(product: Product, quantity: number) {
    if(quantity <= 0)throw new Error("Product quantity cannot be negative");
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
  getQuantity(): number {
    return this.quantity;
  }

  getProduct(): Product {
    return this.product;
  }
}
