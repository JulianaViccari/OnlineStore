import DatabaseRepositoryFactory from "../../src/infra/factory/database_repository_factory";
import MySQLAdapter from "../../src/infra/repository/implementations/msql_adapters";
import JsonPresenter from "../../src/infra/presenter/json_presenter";
import GetProducts from "../../src/application/usecase/get_products";

test("should return Products", async function () {
  //Framework and Driver
  const connection = new MySQLAdapter();
  await connection.connect();
  //Interface adapter
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  // use cases
  const getProducts = new GetProducts(repositoryFactory, new JsonPresenter());
  const output = await getProducts.execute();
  expect(output).toHaveLength(4);
  connection.close();
});
