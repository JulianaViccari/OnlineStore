export default class Coupon {
  constructor(
    readonly code: string,
    readonly percent: number,
    readonly quantity: number,
    readonly validAt: Date
  ) {
    this.code = code;
    this.percent = percent;
    this.quantity = quantity;
    this.validAt = validAt;
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

  isValid(): boolean {
    return new Date().getTime() <= this.validAt.getTime();
  }

  calculateDiscount(amount: number): number {
    const result = (amount * this.percent) / 100;
    return result;
  }
}
