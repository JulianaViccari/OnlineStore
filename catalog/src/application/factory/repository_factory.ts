import ProductRepository from "../repository/product_repository_interface";

export default interface RepositoryFactory {
  createProductRepositoryInMemory(): ProductRepository;
  createProductRepositorySQL(): ProductRepository;
}
