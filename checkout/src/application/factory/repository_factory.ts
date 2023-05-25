import CouponRepository from "../repository/coupon_repository_interface";
import OrderRepository from "../repository/order_repository_interface";
import ProductRepository from "../repository/product_repository_interface";

export default interface RepositoryFactory {
  createOrderRepository(): OrderRepository;
  createProductRepositoryInMemory(): ProductRepository;
  createCouponRepository(): CouponRepository;
  createProductRepositorySQL(): ProductRepository;
}
