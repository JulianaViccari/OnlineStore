import User from "../../../src/domain/entities/User";
import TokenGenerate from "../../../src/domain/entities/token_generate"
import MySQLAdapter from "../../../src/infra/repository/implementations/mysql_adapters";
import UserMysqlRepository from "../../../src/infra/repository/user_sql_repository";

test("should assign a token", async function () {
    const tokenGenerate = new TokenGenerate("secret");
    const user = User.create("henrique@gmail.com", "abc123")
    const token = tokenGenerate.sign(user, new Date("2023-03-01T10:00:00"));
    expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbnJpcXVlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDB9.6N6ZjnwCYzEvBkbvYTznaXWjVtV2mK_S1G9X0XSA9Ds")
    const connection = new MySQLAdapter();
    await connection.connect();
    const userRepository = new UserMysqlRepository(connection);
    await userRepository.delete("henrique@gmail.comusecases")
    connection.close()
});

test("should verify a token", function () {
    const tokenGenerate = new TokenGenerate("secret");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbnJpcXVlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDB9.6N6ZjnwCYzEvBkbvYTznaXWjVtV2mK_S1G9X0XSA9Ds";
    const output = tokenGenerate.verify(token);
    expect(output.email).toBe("henrique@gmail.com")
});
