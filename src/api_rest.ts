import express, { Request, Response } from "express";
import { checkout } from "./checkout";
const app = express();

app.use(express.json());

app.post("/checkout", async function (req: Request, resp: Response) {
  try {
    const output = checkout(req.body);
    resp.json(output);
    return;
  } catch (error: any) {
    console.log(
      error.message
    );
    resp.status(422).json({
      message: error.message,
    });
    return;
  }
});
app.listen(3000);
