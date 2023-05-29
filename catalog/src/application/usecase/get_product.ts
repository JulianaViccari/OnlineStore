import Product from "../../domain/entities/product";
import RepositoryFactory from "../factory/repository_factory";
import ProductRepository from "../repository/product_repository_interface";

// usecase
export default class GetProduct {
  productsRepository: ProductRepository;
  constructor(
    repositoryFactory: RepositoryFactory,
  ) {
    this.productsRepository = repositoryFactory.createProductRepositorySQL();
  }

  async execute(productId: string): Promise<Product> {
    const product = await this.productsRepository.get(productId);
    return Object.assign(product, {
      volume: product.getVolume(),
      density: product.getDensity()
    });
  }

}
