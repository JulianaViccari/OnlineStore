import RepositoryFactory from "./factories/repository_factory";
import Presenter from "./presenter";
import ProductRepository from "./repository/product_repository_interface";

// usecase
export default class GetProducts {
  productsRepository: ProductRepository;
  constructor(repositoryFactory: RepositoryFactory, readonly presenter: Presenter) {
    this.productsRepository = repositoryFactory.createProductRepositorySQL();
  }

  async execute(): Promise<any> {
    const productsData = await this.productsRepository.list();
    const output: Output[] = []
    for (const product of productsData){
      output.push({
        idProduct: product.id,
        description: product.description,
        price: product.price
      })
    }
    return this.presenter.presenter(output);
  }
}

type Output = {
  idProduct: string,
  description: string,
  price: number
}
