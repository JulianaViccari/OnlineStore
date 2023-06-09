import Coupon from "../../../domain/entities/coupon";
import CouponRepository from "../../../application/repository/coupon_repository_interface";

export default class CouponInMemoryRepository implements CouponRepository {
  private couponsDB: Coupon[];

  constructor() {
    this.couponsDB = [
      new Coupon("discount10", 10, 15, new Date(2023, 3, 24, 23, 47, 0, 0)),
      new Coupon("discount20", 20, 15, new Date(2023, 6, 24, 23, 47, 0, 0)),
      new Coupon("discount5", 5, 15, new Date(2023, 0, 24, 23, 47, 0, 0)),
    ];
  }

  async get(code: string): Promise<Coupon | undefined> {
    return this.couponsDB.filter((c) => c.getCode() === code)[0];
  }
}
