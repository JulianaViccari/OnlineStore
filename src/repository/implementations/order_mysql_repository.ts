import mysql from "mysql2";
import Order from "../../entities/order";
import OrderRepository from "../order_repository_interface";
import Client from "../../entities/client";
import OrderDetail from "../../entities/order_detail";

export default class OrderMysqlRepository implements OrderRepository {
  private conn?: mysql.Connection;

  public async create(order: Order): Promise<void> {
    try {
      this.conn = this.openConnection();
      const query =
        "insert into orders (id, client_cpf, status) values(?, ?, ?)";
      return new Promise((resolve, reject) => {
        this.conn?.query(
          query,
          [order.getId(), order.getClientCpf(), "created"],
          (error, _) => {
            if (error) {
              return reject(error);
            } else {
              resolve();
            }
          }
        );
      });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      await this.closeConnection();
    }
  }

  public async getById(orderId: string): Promise<Order | undefined> {
    try {
      this.conn = this.openConnection();
      const query = "select id, client_cpf, status from orders where id = ?";

      return new Promise((resolve, reject) => {
        this.conn?.query(query, [orderId], (error: any, results: any) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(this.bindOne(results));
          }
        });
      });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      await this.closeConnection();
    }
  }

  public async getAll(): Promise<Order[] | undefined> {
    try {
      this.conn = this.openConnection();
      const query = "select id, client_cpf, status from orders";

      return new Promise((resolve, reject) => {
        this.conn?.query(query, (error: any, results: any) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(this.bindMany(results));
          }
        });
      });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      await this.closeConnection();
    }
  }

  private openConnection(): mysql.Connection {
    try {
      return mysql.createConnection({
        host: "127.0.0.1",
        user: "app_user",
        password: "123",
        database: "online_store",
        port: 3306,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async closeConnection(): Promise<void> {
    this.conn?.end();
  }

  private bindOne(databaseResult: Array<any>): Order | undefined {
    if (!databaseResult || databaseResult === undefined) return undefined;
    const { id, client_cpf } = databaseResult[0];
    return new Order(
      id,
      Array<OrderDetail>(),
      new Client("", client_cpf, "", "")
    );
  }

  private bindMany(databaseResult: Array<any>): Array<Order> | undefined {
    if (
      !databaseResult ||
      databaseResult === undefined ||
      databaseResult.length === 0
    )
      return undefined;

    const result: Array<Order> = [];
    for (const result of databaseResult) {
      const { id, client_cpf } = databaseResult[0];
      result.push(
        new Order(id, Array<OrderDetail>(), new Client("", client_cpf, "", ""))
      );
    }

    return result;
  }
}
