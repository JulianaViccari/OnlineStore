import { validate } from "./cpf_validation";
import Product from "./entities/product";
import Coupon from "./entities/coupon";
import ProductRepository from "./product_repository_interface";
import CouponRepository from "./coupon_repository_interface";
import EmailGateway from "./email_gateway_interface";

type Output = {
  total: number;
  freight: number;
  subtotal: number;
};

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

export default class Checkout {

  constructor(
    readonly productRepository: ProductRepository,
    readonly couponRepository: CouponRepository,
    readonly emailGateway: EmailGateway
  ) {}

  public async execute(input: any): Promise<Output> {
    const output = {
      subtotal: 0,
      freight: 0,
      total: 0,
    };
    try {
      if (validate(input.cpf)) {
        if (input.items) {
          if (hasDuplicateId(input.items))
            throw new Error("must not repeat item");
          for (const item of input.items) {
            let product = await this.productRepository.get(item.product.id);
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
          const coupon = await this.couponRepository.get(input.coupon);
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
        if (input.email) {
          await this.emailGateway.send(
            "Purchase Sucess",
            "...",
            input.email,
            "test@gmail.com"
          );
        }
        return output;
      } else {
        throw new Error("Invalid CPF");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
