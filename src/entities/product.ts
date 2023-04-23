export default class Product {
    private id: string;
    private name: string; 
    private description: string; 
    private price: number;

    constructor(id: string, name: string, description: string, price: number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
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
} 