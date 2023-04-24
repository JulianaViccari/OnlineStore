export default class Coupon {
    private name: string;
    private validAt: Date;
    private percent: number;
    private quantity: number;

    constructor(name: string, percent: number, quantity: number, validAt: Date,) {
        this.name = name;
        this.validAt = validAt;
        this.percent = percent;
        this.quantity = quantity;
    }

    getName(): string {
        return this.name;
    }

    getValidAt(): Date {
        return this.validAt;
    }

    getPercent(): number {
        return this.percent;
    }

    getQuantity(): number {
        return this.quantity;
    }
} 