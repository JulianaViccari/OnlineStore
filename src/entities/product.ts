export default class Product {
    private id: string;
    private name: string; 
    private description: string; 
    private price: number;
    private width?: number;
    private height?: number;
    private length?: number;
    private weight?: number;

    constructor(
        id: string,
        name: string, 
        description: string, 
        price: number,
        width?: number,
        height?: number,
        length?: number,
        weight?: number,
        ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.width = width;
        this.height = height;
        this.length = length;
        this.weight = weight;
    }

    getId() :string {
        return this.id;
    }

    getName():string {
        return this.name;
    }

    getDescription():string {
        return this.description;
    }

    getPrice():number {
        return this.price;
    }

    getWidth() :number {
        return this.width === undefined ? 0 : this.width;
    }

    getHeight() :number {
        return this.height === undefined ? 0 : this.height;
    }

    getLength() :number {
        return this.length === undefined ? 0 : this.length;
    }

    getWeight() :number {
        return this.weight === undefined ? 0 : this.weight;
    }
} 