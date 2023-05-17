
export default class SimulateFreight {
  
  static calculate(product: any): number {
    let freight = product.getVolume() * 1000 * (product.getDensity() / 100);
    return Math.max(10, freight);
  }
}

