import { validate } from "./cpf_validation";
import Product from "./entities/product";
import Coupon from "./entities/coupon";

const productsDB = [
  new Product("1", "Dove", "shampoo", 17.0, 8, 20, 20, 300),
  new Product("2", "Siege", "shampoo", 48.0, 8, 20, 20, 1),
  new Product("3", "Dove", "condicionador", 22.0, 8, 20, 20, 300),
  new Product("4", "Lux", "sabonete", 2.0, 8, 20, 20, -3),
];

const couponsDB = [
  new Coupon("discount10", 10, 15, new Date(2023, 3, 24, 23, 47, 0, 0)),
  new Coupon("discount20", 20, 15, new Date(2023, 6, 24, 23, 47, 0, 0)),
  new Coupon("discount5", 5, 15, new Date(2023, 0, 24, 23, 47, 0, 0)),
];

function getProductById(products: Array<Product>, id: string): Product {
  return products.filter((p) => p.getId() === id)[0];
}

function getCouponByName(
  coupons: Array<Coupon>,
  name: string
): Coupon | undefined {
  return coupons.filter((c) => c.getName() === name)[0];
}

function hasDuplicateId(details: Array<any>): boolean {
  try {
    let seen = new Set();
    details.forEach((detail) => {
      seen.add(detail.product.id);
    });
    return seen.size !== details.length;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function calculateFreight(product: any): number {
  const volume =
    ((((product.width / 100) * product.height) / 100) * product.length) / 100;
  const density = product.weight / volume;
  return volume * 1000 * (density / 100);
}

function hasNegativeDimensions(product: Product): boolean {
  return (
    product.getHeight() < 0 ||
    product.getLength() < 0 ||
    product.getWeight() < 0 ||
    product.getWidth() < 0
  );
}

export function checkout(input: any): any {
  try {
    if (validate(input.cpf)) {
      const connectionProducts = productsDB;
      const output = {
        total: 0,
        freight: 0,
        subtotal: 0,
      };
      if (input.items) {
        if (hasDuplicateId(input.items))
          throw new Error("must not repeat item");
        for (const item of input.items) {
          let product = getProductById(connectionProducts, item.product.id);
          if (hasNegativeDimensions(product))
            throw new Error("Invalid dimensions");
          if (item.quantity <= 0)
            throw new Error("Product quantity cannot be negative");
          if (product !== undefined) {
            output.subtotal += product.getPrice() * item.quantity;
          }
          if (input.from && input.to) {
            const freight = calculateFreight(product);
            output.freight += Math.max(10, freight) * item.quantity;
          }
        }
      }
      output.total = output.subtotal;
      if (input.coupon) {
        const connectionCoupon = couponsDB;
        let coupon = getCouponByName(connectionCoupon, input.coupon);
        if (
          coupon !== undefined &&
          new Date().getTime() <= coupon.getValidAt().getTime()
        ) {
          const couponPercent = coupon.getPercent();
          output.total -= (output.total * couponPercent) / 100;
        } else {
          throw new Error("Coupon invalid");
        }
      }
      output.total += output.freight;
      return output;
    } else {
      throw new Error("Invalid CPF");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
