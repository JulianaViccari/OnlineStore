import { verify } from "jsonwebtoken";
import UsecaseFactory from "../factory/usecase_factory";
import HttpServer from "./http_server";

//interface adapter
export default class HttpController {
  constructor(httpService: HttpServer, useCaseFactory: UsecaseFactory) {
    httpService.on("post","/verify",async function (params: any, body: any, headers: any) {
      const verify = useCaseFactory.createVerify();
      const output = await verify.execute(body.token);
      console.log(output)
      return output;
      }
    );
    
  }
}
