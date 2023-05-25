import RepositoryFactory from "../../application/factory/repository_factory";
import Checkout from "../../application/usecase/checkout";
import GetOrder from "../../application/usecase/get_order";
import GetProducts from "../../application/usecase/get_products";
import CsvPresenter from "../presenter/Csv_presenter";
import JsonPresenter from "../presenter/json_presenter";

export default class UsecaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  createCheckout(): Checkout {
    return new Checkout(this.repositoryFactory);
  }
  createdGetOrder(): GetOrder {
    return new GetOrder(this.repositoryFactory);
  }
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
}
