import UsecaseFactory from "../factory/usecase_factory";
import HttpServer from "./http_server";

//interface adapter
export default class HttpController {
  constructor(httpService: HttpServer, usecaseFactory: UsecaseFactory) {
    httpService.on("get","/products",async function (params: any, body: any, headers: any) {
        const contentType = headers["content-type"];
        const getProducts = usecaseFactory.createdGetProducts(contentType);
        const output = await getProducts.execute();
        return output;
      }
    );
    
    httpService.on("get","/products/:idProduct",
      async function (params: any, body: any, headers: any) {
        const getProducts = usecaseFactory.createdGetProduct();
        const output = await getProducts.execute(params.idProduct);
        return output;
      }
    );
  }
}
