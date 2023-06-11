import AuthDecorator from "../../application/decorator/auth_decorator";
import GatewayFactory from "../../application/factory/gateway_factory";
import RepositoryFactory from "../../application/factory/repository_factory";
import Checkout from "../../application/usecase/checkout";
import GetOrder from "../../application/usecase/get_order";
import GetProducts from "../../application/usecase/get_products";
import CsvPresenter from "../presenter/Csv_presenter";
import JsonPresenter from "../presenter/json_presenter";

export default class UsecaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory, readonly gatewayFactory: GatewayFactory) {}

  createCheckout() {
    return new AuthDecorator(new Checkout(this.repositoryFactory, this.gatewayFactory), this.gatewayFactory);
  }
  createdGetOrder() {
    return new AuthDecorator(new GetOrder(this.repositoryFactory, this.gatewayFactory), this.gatewayFactory);
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
