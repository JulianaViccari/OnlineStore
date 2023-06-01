import SimulateFreight from "../../src/application/usecase/simulate_feight";
import DatabaseRepositoryFactory from "../../src/infra/factory/database_repository_factory";
import MySQLAdapter from "../../src/infra/implementations/msql_adapters";

test("should simulate freight with calculate distance", async function () {
  const input = {
    product: [ 
      { volume: 0.03, density: 100, quantity: 1}
    ],
    from: "99015600", //cep origem
    to: "22060030", //cep destino
  };

  const connect = new MySQLAdapter();
  await connect.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connect);
  const simulateFreight = new SimulateFreight(repositoryFactory);
  const output = await simulateFreight.execute(input);
  expect(output.freight).toBe(24.57825841799353);
});

test("should simulate freight without calculate distance", async function () {
  const input = {
    product: [ 
      { volume: 0.03, density: 100, quantity: 1}
    ],
    from: "14620000", //cep origem
    to: "06445550", //cep destino
  };

  const connect = new MySQLAdapter();
  await connect.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connect);
  const simulateFreight = new SimulateFreight(repositoryFactory);
  const output = await simulateFreight.execute(input);
  expect(output.freight).toBe(30);
});

