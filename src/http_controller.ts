import UsecaseFactory from "./factories/usecase_factory";
import HttpServer from "./http_server";

//interface adapter
export default class HttpController {
  constructor(httpService: HttpServer, usecaseFactory: UsecaseFactory) {
    httpService.on(
      "post",
      "/checkout",
      async function (params: any, body: any) {
        const checkout = usecaseFactory.createCheckout();
        const output = await checkout.execute(body);
        return output;
      }
    );

    httpService.on(
      "get",
      "/orders/:orderId",
      async function (params: any, body: any) {
        const getOrder = usecaseFactory.createdGetOrder();
        const output = await getOrder.execute(params["orderId"]);
        return output;
      }
    );

    httpService.on("get", "/products", async function (params: any, body: any) {
      const getProducts = usecaseFactory.createdGetProducts();
      const output = await getProducts.execute();
      return output;
    });
  }
}
