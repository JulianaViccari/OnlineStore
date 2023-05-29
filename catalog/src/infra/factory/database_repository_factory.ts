import ProductRepository from "../../application/repository/product_repository_interface";
import DatabaseConnection from "../database/database_connection";
import ProductInMemoryRepository from "../repository/implementations/product_in_memory_repository";
import ProductSQLRepository from "../repository/implementations/product_sql_repository";
import RepositoryFactory from "../../application/factory/repository_factory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {}
  createProductRepositoryInMemory(): ProductRepository {
    return new ProductInMemoryRepository();
  }

  createProductRepositorySQL(): ProductRepository {
    return new ProductSQLRepository(this.connection);
  }
}
