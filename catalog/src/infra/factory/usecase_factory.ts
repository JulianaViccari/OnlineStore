import RepositoryFactory from "../../application/factory/repository_factory";
import GetProduct from "../../application/usecase/get_product";
import GetProducts from "../../application/usecase/get_products";
import CsvPresenter from "../presenter/Csv_presenter";
import JsonPresenter from "../presenter/json_presenter";

export default class UsecaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  createdGetProducts(type: string): GetProducts {
    let presenter;
    if (type === "application/json") {
      presenter = new JsonPresenter();
    }
    if (type === "text/csv") {
      presenter = new CsvPresenter();
    }
    if (!presenter) throw new Error("Invalid type");
    return new GetProducts(this.repositoryFactory, presenter);
  }

  createdGetProduct(): GetProduct {
    return new GetProduct(this.repositoryFactory);
  }
}
