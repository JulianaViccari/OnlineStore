"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, name, description, price, width, height, length, weight) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.width = width;
        this.height = height;
        this.length = length;
        this.weight = weight;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getPrice() {
        return this.price;
    }
    getWidth() {
        return this.width === undefined ? 0 : this.width;
    }
    getHeight() {
        return this.height === undefined ? 0 : this.height;
    }
    getLength() {
        return this.length === undefined ? 0 : this.length;
    }
    getWeight() {
        return this.weight === undefined ? 0 : this.weight;
    }
}
exports.default = Product;
//# sourceMappingURL=product.js.map