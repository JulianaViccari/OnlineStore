export default class ProductDTO {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
  
    constructor(
      id?: string,
      name?: string,
      description?: string,
      price?: number,
      width?: number,
      height?: number,
      length?: number,
      weight?: number
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.width = width;
      this.height = height;
      this.length = length;
      this.weight = weight;
    }
  }
  