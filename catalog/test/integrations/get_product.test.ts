import GetProduct from "../../src/application/usecase/get_product";
import DatabaseRepositoryFactory from "../../src/infra/factory/database_repository_factory";
import MySQLAdapter from "../../src/infra/repository/implementations/mysql_adapters";

test("should return Product", async function () {
  //Framework and Driver
  const connection = new MySQLAdapter();
  await connection.connect();
  //Interface adapter
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  // use cases
  const getProduct = new GetProduct(repositoryFactory);
  const output = await getProduct.execute("1");
  expect(output.id).toBe("1");
  expect(output.name).toBe("Dove");
  expect(output.description).toBe("shampoo");
  await connection.close();
});
