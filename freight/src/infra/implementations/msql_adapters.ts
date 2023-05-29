import mysql from "mysql2/promise";
import DatabaseConnection from "../database/database_connection";

//Framework and Driver
//adapter fica do lado de fora da aplicação
export default class MySQLAdapter implements DatabaseConnection {
  private conn?: mysql.Connection;

  async connect(): Promise<void> {
    try {
      this.conn = await mysql.createConnection({
        host: "127.0.0.1",
        user: "app_user",
        password: "123",
        database: "online_store",
        port: 3306,
      });
      return;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async query(query: string, parameters: Array<any> = []): Promise<any> {
    return await this.conn?.execute(query, parameters);
  }

  async close(): Promise<void> {
    await this.conn?.end();
  }
}
