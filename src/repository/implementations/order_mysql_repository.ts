import mysql from "mysql2";
import OrderRepository from "../order_repository_interface";
import OrderDTO from "../../dtos/order_dto";
import OrderDetailDTO from "../../dtos/order_detail_dto";
import ClientDTO from "../../dtos/client_dto";

export default class OrderMysqlRepository implements OrderRepository {
  private conn?: mysql.Connection;

  public async create(order: OrderDTO): Promise<void> {
    if (order === undefined) return undefined;
    try {
      this.conn = this.openConnection();
      const createOrderSQL =
        "insert into orders (id, client_cpf, status) values(?, ?, ?)";
      const createOrderParameters = [order.id, order.client?.cpf, "created"];
      await this.execInsertStatement(
        createOrderSQL,
        createOrderParameters,
        this.conn
      );

      if (order.orderDetails && order.orderDetails.length > 0) {
        const createDetailSQL =
          "insert into order_details (order_id, product_id, quantity) values(?, ?, ?)";

        for (const detail of order.orderDetails) {
          const createDetailParameters = [
            order.id,
            detail.product?.id,
            detail.quantity,
          ];
          await this.execInsertStatement(
            createDetailSQL,
            createDetailParameters,
            this.conn
          );
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      await this.closeConnection();
    }
  }

  public async getById(orderId: string): Promise<OrderDTO | undefined> {
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

  public async getAll(): Promise<OrderDTO[] | undefined> {
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

  private bindOne(databaseResult: Array<any>): OrderDTO | undefined {
    if (
      !databaseResult ||
      databaseResult === undefined ||
      databaseResult.length === 0
    )
      return undefined;
    const { id, client_cpf } = databaseResult[0];
    return new OrderDTO(
      id,
      Array<OrderDetailDTO>(),
      new ClientDTO("", client_cpf, "", "")
    );
  }

  private bindMany(databaseResult: Array<any>): Array<OrderDTO> | undefined {
    if (this.isEmptyResultSet(databaseResult)) return undefined;

    const result: Array<OrderDTO> = [];
    for (const result of databaseResult) {
      const { id, client_cpf } = databaseResult[0];
      result.push(
        new OrderDTO(
          id,
          Array<OrderDetailDTO>(),
          new ClientDTO("", client_cpf, "", "")
        )
      );
    }

    return result;
  }

  private async execInsertStatement(
    query: string,
    parameterValues: Array<any>,
    conn: mysql.Connection
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      conn.query(query, parameterValues, (error, result) => {
        if (error) {
          return reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  private isEmptyResultSet(resultSet: Array<any>): boolean {
    return !resultSet || resultSet === undefined || resultSet.length === 0;
  }
}
