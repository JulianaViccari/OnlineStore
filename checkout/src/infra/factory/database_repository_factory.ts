import CouponRepository from "../../application/repository/coupon_repository_interface";
import OrderRepository from "../../application/repository/order_repository_interface";
import ProductRepository from "../../application/repository/product_repository_interface";
import CouponInMemoryRepository from "../repository/implementations/coupon_in_memory_repository";
import DatabaseConnection from "../database/database_connection";
import OrderSqlRepository from "../repository/implementations/order_sql_repository";
import ProductInMemoryRepository from "../repository/implementations/product_in_memory_repository";
import ProductSQLRepository from "../repository/implementations/product_sql_repository";
import RepositoryFactory from "../../application/factory/repository_factory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {}
  createOrderRepository(): OrderRepository {
    return new OrderSqlRepository(this.connection);
  }
  createProductRepositoryInMemory(): ProductRepository {
    return new ProductInMemoryRepository();
  }
  createCouponRepository(): CouponRepository {
    return new CouponInMemoryRepository();
  }
  createProductRepositorySQL(): ProductRepository {
    return new ProductSQLRepository(this.connection);
  }
}
