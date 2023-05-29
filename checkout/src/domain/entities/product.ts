export default class Product {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly width: number,
    readonly height: number,
    readonly length: number,
    readonly weight: number,
    readonly density?: number,
    readonly volume?: number
  ) {
    if ( this.getHeight() < 0 ||this.getLength() < 0 ||this.getWidth() < 0) throw new Error("Invalid dimensions")
    if (this.getWeight() < 0) throw new Error("Invalid weight")
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.width = width;
    this.height = height;
    this.length = length;
    this.weight = weight;
    this.density = density;
    this.volume = volume;
  }

  public getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }

  getWidth(): number {
    return this.width === undefined ? 0 : this.width;
  }

  getHeight(): number {
    return this.height === undefined ? 0 : this.height;
  }

  getLength(): number {
    return this.length === undefined ? 0 : this.length;
  }

  getWeight(): number {
    return this.weight === undefined ? 0 : this.weight;
  }

  // getVolume(): number {
  //   return ((((this.width / 100) * this.height) / 100) * this.length) / 100;
  // }

  // getDensity() {
  //   return this.weight / this.getVolume();
  // }

  hasNegativeDimensions(): boolean {
    return (
      this.getHeight() < 0 ||
      this.getLength() < 0 ||
      this.getWeight() < 0 ||
      this.getWidth() < 0
    );
  }
}
