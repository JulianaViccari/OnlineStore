import ProductDTO from "../dtos/product_dto";
import Product from "../entities/product";

export default class ProductFactory {
  buildEntityFromDTO(productDto: ProductDTO): Product  {
    return new Product(
      productDto.id === undefined ? "" : productDto.id,
      productDto.name === undefined ? "" : productDto.name,
      productDto.description === undefined ? "" : productDto.description,
      productDto.price === undefined ? 0 : productDto.price,
      productDto.width === undefined ? 0 : productDto.width,
      productDto.height === undefined ? 0 : productDto.height,
      productDto.length === undefined ? 0 : productDto.length,
      productDto.weight=== undefined ? 0 : productDto.weight
    );
  }
}
