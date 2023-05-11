export default class Coupon {
  private code: string;
  private validAt: Date;
  private percent: number;
  private quantity: number;

  constructor(name: string, percent: number, quantity: number, validAt: Date) {
    this.code = name;
    this.validAt = validAt;
    this.percent = percent;
    this.quantity = quantity;
  }

  getCode(): string {
    return this.code;
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
