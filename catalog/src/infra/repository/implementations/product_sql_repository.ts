import ProductRepository from "../../../application/repository/product_repository_interface";
import Product from "../../../domain/entities/product";
import DatabaseConnection from "../../database/database_connection";

export default class ProductSQLRepository implements ProductRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async list(): Promise<Product[]> {
    try {
      const query = "select id, name, description, price, width, height, length, weight from products";
      const [rows, _] = await this.connection?.query(query, []);
      return this.bind(rows, _);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async get(productId: string): Promise<Product> {
    try {
      const query =
        "select id, name, description, price, width, height, length, weight from products where id = ?";
      const [rows, _] = await this.connection?.query(query, [productId]);
      const result = this.bind(rows, _);
      if (result === undefined || result.length === 0)
        throw new Error("Undefined");
      return result[0];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private bind(rows: any[], fields: any[]): Array<Product> {
    if (rows.length === 0) throw new Error("Length === 0");
    const result: Array<Product> = [];
    for (const row of rows) {
      const { id, name, description, price, width, height, length, weight } = row;
      result.push(new Product(id, name, description, price,  width, height, length, weight));
    }

    return result;
  }
}
