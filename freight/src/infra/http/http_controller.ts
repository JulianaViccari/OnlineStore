import UsecaseFactory from "../factory/usecase_factory";
import HttpServer from "./http_server";

//interface adapter
export default class HttpController {
  constructor(httpService: HttpServer, usecaseFactory: UsecaseFactory) {
    httpService.on(
      "post",
      "/simulateFreight",
      async function (params: any, body: any, headers: any) {
        const simulateFreight = usecaseFactory.createSimulateFreight();
        const output = await simulateFreight.execute(body);
        return output;
      }
    );
  }
}
