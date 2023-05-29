import Product from "../../domain/entities/product";

export default interface ProductRepository {
  get(productId: string): Promise<Product>;
  list(): Promise<Product[]>;
}
