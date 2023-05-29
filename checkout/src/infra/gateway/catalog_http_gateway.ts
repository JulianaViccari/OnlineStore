import CatalogGateway from "../../application/gateway/catalog_gateway";
import Product from "../../domain/entities/product";
import HttpClient from "../http/http_client";

export default class CatalogHttpGateway implements CatalogGateway {
  constructor(readonly httpClient: HttpClient) {}

  async getProduct(idProduct: string): Promise<Product> {
    const output = await this.httpClient.get(
      `http://localhost:3001/products/${idProduct}`
    );
    const product = new Product(
      output.id,
      output.name,
      output.description,
      output.price,
      output.width,
      output.height,
      output.length,
      output.weight,
      output.density,
      output.volume
    );
    return product;
  }
}
