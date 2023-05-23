import Product from "../entities/product";

export default interface ProductRepository {
  get(productId: string):  Promise<Product>;
  list(): Promise<Product[]>;
}
