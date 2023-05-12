import ProductDTO from "./product_dto";

export default class OrderDetailDTO {
  product?: ProductDTO;
  quantity?: number;

  constructor(product?: ProductDTO, quantity?: number) {
    this.product = product;
    this.quantity = quantity;
  }
}
