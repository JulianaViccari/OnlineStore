export default class FreightCalculator {
  
  static calculate(product: any): number {
    let freight = product.volume * 1000 * (product.density / 100);
    return Math.max(10, freight);
  }
}

