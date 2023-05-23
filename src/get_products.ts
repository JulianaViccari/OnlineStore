import RepositoryFactory from "./factories/repository_factory";
import ProductRepository from "./repository/product_repository_interface";

export default class GetProducts {
  productsRepository: ProductRepository;
  constructor(repositoryFactory: RepositoryFactory) {
    this.productsRepository = repositoryFactory.createProductRepositorySQL();
  }

  async execute(): Promise<Output[]> {
    const productsData = await this.productsRepository.list();
    const output: Output[] = []
    for (const product of productsData){
      output.push({
        idProduct: product.id,
        description: product.description,
        price: product.price
      })
    }
    return output;
  }
}

type Output = {
  idProduct: string,
  description: string,
  price: number
}
