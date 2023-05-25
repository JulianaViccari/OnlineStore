import UsecaseFactory from "./infra/factory/usecase_factory";
import DatabaseRepositoryFactory from "./infra/factory/database_repository_factory";
import ExpressAdapter from "./infra/http/express_adapter";
import HttpController from "./infra/http/http_controller";
import MySQLAdapter from "./infra/repository/implementations/msql_adapters";

//boundary
const connection = new MySQLAdapter();
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const httpServer = new ExpressAdapter();
const usecaseFactory = new UsecaseFactory(repositoryFactory);
new HttpController(httpServer, usecaseFactory);

// app.get("/", async function (req: Request, resp: Response) {
//   const orders = await new GetOrders(repositoryFactory).execute();
//   resp.send(orders);
// });
httpServer.app.listen(3000);
