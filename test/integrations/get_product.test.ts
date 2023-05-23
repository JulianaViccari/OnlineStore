import DatabaseRepositoryFactory from "../../src/factories/database_repository_factory";
import GetProducts from "../../src/get_products";
import MySQLAdapter from "../../src/repository/implementations/msql_adapters";
import JsonPresenter from "../../src/json_presenter";

test("should return Products", async function () {
  //Framework and Driver
  const connection = new MySQLAdapter();
  await connection.connect();
  //Interface adapter
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  // use cases
  const getProducts = new GetProducts(repositoryFactory, new JsonPresenter);
  const output = await getProducts.execute();
  expect(output).toHaveLength(4);
  connection.close();
});
