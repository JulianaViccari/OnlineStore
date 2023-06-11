import UsecaseFactory from "../factory/usecase_factory";
import HttpServer from "./http_server";

//interface adapter
export default class HttpController {
  constructor(httpService: HttpServer, usecaseFactory: UsecaseFactory) {
    httpService.on(
      "post",
      "/checkout",
      async function (params: any, body: any, headers: any) {
        body.headers = headers.token;
        const checkout = usecaseFactory.createCheckout();
        const output = await checkout.execute(body);
        return output;
      }
    );

    httpService.on(
      "get",
      "/orders/:orderId",
      async function (params: any, body: any, headers: any) {
        const getOrder = usecaseFactory.createdGetOrder();
        const output = await getOrder.execute(params["orderId"]);
        return output;
      }
    );

    httpService.on(
      "get",
      "/products",
      async function (params: any, body: any, headers: any) {
        const contentType = headers["content-type"];
        const getProducts = usecaseFactory.createdGetProducts(contentType);
        const output = await getProducts.execute();
        return output;
      }
    );
  }
}
