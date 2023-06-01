// Domain service
export default class FreightCalculator {
  
  static calculate(product: any, distance: number): number {
    let freight = product.volume * distance * (product.density / 100);
    return Math.max(10, freight);
  }
}

