import Checkout from "./checkout";
import DatabaseRepositoryFactory from "./factories/database_repository_factory";
import MySQLAdapter from "./repository/implementations/msql_adapters";
import ExpressAdapter from "./express_adapter";
import HttpController from "./http_controller";
import GetOrder from "./get_order";
import GetProducts from "./get_products";
import UsecaseFactory from "./factories/usecase_factory";
//boundary
const connection = new MySQLAdapter();
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const httpServer = new ExpressAdapter();
const usecaseFactory = new UsecaseFactory(repositoryFactory)
new HttpController(httpServer,usecaseFactory);



// app.get("/", async function (req: Request, resp: Response) {
//   const orders = await new GetOrders(repositoryFactory).execute();
//   resp.send(orders);
// });
httpServer.app.listen(3000);
