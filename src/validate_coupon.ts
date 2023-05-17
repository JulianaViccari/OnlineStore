import CouponRepository from "./repository/coupon_repository_interface";

export default class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(code: string): Promise<Output> {
    const output = {
      isValid: false,
    };
    const coupon = await this.couponRepository.get(code);
    if (!coupon) return output;

    output.isValid = coupon.isValid();

    return output;
  }
}

type Output = {
  isValid: boolean;
};
