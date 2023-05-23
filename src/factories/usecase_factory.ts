import CsvPresenter from "../Csv_presenter";
import Checkout from "../checkout";
import GetOrder from "../get_order";
import GetProducts from "../get_products";
import JsonPresenter from "../json_presenter";
import Presenter from "../presenter";
import RepositoryFactory from "./repository_factory";

export default class UsecaseFactory {
    constructor(readonly repositoryFactory: RepositoryFactory) {
    }

    createCheckout(): Checkout{
        return new Checkout(this.repositoryFactory);
    }
    createdGetOrder(): GetOrder{
        return new GetOrder(this.repositoryFactory);
    }
    createdGetProducts(type: string): GetProducts{
        let presenter;
        if(type === "application/json") {
            presenter = new JsonPresenter();
          }
          if(type === "text/csv"){
            presenter = new CsvPresenter();
          }
          if(!presenter) throw new Error("Invalid type")
        return new GetProducts(this.repositoryFactory, presenter);
    }
}