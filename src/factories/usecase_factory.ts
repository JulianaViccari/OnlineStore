import Checkout from "../checkout";
import GetOrder from "../get_order";
import GetProducts from "../get_products";
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
    createdGetProducts(): GetProducts{
        return new GetProducts(this.repositoryFactory);
    }
}