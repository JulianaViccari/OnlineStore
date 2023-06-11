import Login from "../../src/application/usecase/login";
import Signup from "../../src/application/usecase/signup";
import MySQLAdapter from "../../src/infra/repository/implementations/mysql_adapters";
import UserMysqlRepository from "../../src/infra/repository/user_sql_repository";

test("Performs Signup", async function () {
  const connection = new MySQLAdapter();
  await connection.connect();
  const userRepository = new UserMysqlRepository(connection);
  await userRepository.delete("henrique@gmail.comusecases")
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
})