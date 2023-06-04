import Login from "../../src/application/usecase/login";
import Signup from "../../src/application/usecase/signup";
import DatabaseRepositoryFactory from "../../src/infra/factory/database_repository_factory";
import MySQLAdapter from "../../src/infra/repository/implementations/mysql_adapters";

test.only("Performs Signup", async function () {
  const connection = new MySQLAdapter();
  await connection.connect();
  const userRepository = new DatabaseRepositoryFactory(connection);
  const signup = new Signup(userRepository);
  const input = {
    email: "henrique@gmail.com",
    password: "abc123",
  };
  await signup.execute(input);
  const login = new Login(userRepository);
  const output = await login.execute({
    email: "henrique@gmail.com",
    password: "abc123",
    date: new Date("2023-03-01T10:00:00"),
  });
  expect(output.token).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbnJpcXVlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDB9.6N6ZjnwCYzEvBkbvYTznaXWjVtV2mK_S1G9X0XSA9Ds"
  );
  await connection.close();
});
