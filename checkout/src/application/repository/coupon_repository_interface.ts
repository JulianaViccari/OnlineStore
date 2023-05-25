import Coupon from "../../domain/entities/coupon";


export default interface CouponRepository {
  get(code: string): Promise<Coupon | undefined>;
}
