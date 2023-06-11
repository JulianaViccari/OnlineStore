import HttpServer from "./http_server";
import express, { Request, Response } from "express";

//Framework and Driver
export default class ExpressAdapter implements HttpServer {
  app: any;
  constructor() {
    
    this.app = express();
    this.app.use(express.json());
  }
  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: Request, resp: Response) {
      try {
        let output = await callback(req.params, req.body, req.headers);
        resp.json(output);
      } catch (error: any) {
        resp.status(422).json({
          message: error.message,
        });
      }
    });
  }
  lister(port: number): void {
    this.app.listen(port);
  }
}
