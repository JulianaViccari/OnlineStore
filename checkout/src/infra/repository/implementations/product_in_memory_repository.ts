import ProductRepository from "../../../application/repository/product_repository_interface";
import Product from "../../../domain/entities/product";

export default class ProductInMemoryRepository implements ProductRepository {
  private productsDB: Product[];

  constructor() {
    this.productsDB = [
      new Product("1", "Dove", "shampoo", 17.0, 8, 20, 20, 300),
      new Product("2", "Siege", "shampoo", 48.0, 8, 20, 20, 1),
      new Product("3", "Dove", "condicionador", 22.0, 8, 20, 20, 300),
      new Product("4", "Lux", "sabonete", 2.0, 8, 20, 20, 3),
    ];
  }
  async list(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  async get(productId: string): Promise<Product> {
    return this.productsDB.filter((p) => p.getId() === productId)[0];
  }
}
