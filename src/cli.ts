import Checkout from "./checkout";
import CouponInMemoryRepository from "./coupon_in_memory_repository";
import EmailInMemoryRepository from "./email_in_memory_repository";
import OrderDetail from "./entities/order_detail";
import Product from "./entities/product";
import ProductInMemoryRepository from "./product_in_memory_repository";
const input: { cpf: string; items: OrderDetail[]; from: string; to: string } = {
  cpf: "",
  items: [],
  from: "",
  to: "",
};

process.stdin.on("data", function (data) {
  const command = data.toString().replace(/\n/g, "");
  if (command.startsWith("set-cpf")) {
    input.cpf = command.replace("set-cpf", "");
    console.log(input);
    return;
  }
  if (command.startsWith("add-item")) {
    const [idProduct, quantity] = command.replace("add-item ", "").split(" ");
    const orderDetail = new OrderDetail(
      new Product(idProduct, "", "", 0),
      parseInt(quantity)
    );

    input.items.push(orderDetail);
    console.log(input);
    return;
  }
  if (command.startsWith("set-from")) {
    input.from = command.replace("set-from", "");
    console.log(input);
    return;
  }
  if (command.startsWith("set-to")) {
    input.to = command.replace("set-to", "");
    console.log(input);
    return;
  }
  if (command.startsWith("checkout")) {
    try {
        const productsRepository = new ProductInMemoryRepository();
        const couponsRepository = new CouponInMemoryRepository();
        const emailGateway = new EmailInMemoryRepository();
        
        const output = new Checkout(productsRepository, couponsRepository, emailGateway).execute(input);
      console.log(output);
      return;
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  }
  if (command.startsWith("quit")) {
    process.exit(0);
  }
  console.log("Invalid command");
});
