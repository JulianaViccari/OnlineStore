import OrderRepository from "../../../application/repository/order_repository_interface";
import ClientDTO from "../../../dtos/client_dto";
import OrderDetailDTO from "../../../dtos/order_detail_dto";
import OrderDTO from "../../../dtos/order_dto";
import DatabaseConnection from "../../database/database_connection";
// interface adapter.

export default class OrderSqlRepository implements OrderRepository {
  constructor(readonly connection: DatabaseConnection) {}

  public async count(): Promise<number> {
    try {
      const query = "select count(1) as orders_count from orders";
      const [rows, _] = await this.connection.query(query, undefined);
      return rows[0]["orders_count"];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(order: OrderDTO): Promise<void> {
    if (order === undefined) return undefined;
    try {
      const createOrderSQL =
        "insert into orders (id, code, amount, client_cpf, status) values(?, ?, ?, ?, ?)";
      const createOrderParameters = [
        order.id,
        order.code,
        order.amount,
        order.client?.cpf,
        "created",
      ];
      await this.execInsertStatement(createOrderSQL, createOrderParameters);

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
            createDetailParameters
          );
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getById(code: string): Promise<OrderDTO | undefined> {
    try {
      const query =
        "select id, code, client_cpf, status, amount from orders where code = ?";
      const [rows, _] = await this.connection?.query(query, [code]);
      const result = this.bind(rows, _);
      if (result === undefined || result.length === 0) return undefined;
      return result[0];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAll(): Promise<OrderDTO[] | undefined> {
    try {
      const query = "select id, code, client_cpf, status, amount from orders";
      const [rows, _] = await this.connection?.query(query, []);
      return this.bind(rows, _);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private bindCount(databaseResult: Array<any>): number {
    const { orders_count } = databaseResult[0];
    return orders_count;
  }

  private bind(rows: any[], fields: any[]): Array<OrderDTO> | undefined {
    if (rows.length === 0) return undefined;

    const result: Array<OrderDTO> = [];
    for (const row of rows) {
      const { id, client_cpf, code, amount } = row;
      result.push(
        new OrderDTO(
          id,
          Array<OrderDetailDTO>(),
          new ClientDTO("", client_cpf, "", ""),
          parseFloat(amount),
          code
        ),
      );
    }

    return result;
  }

  private async execInsertStatement(
    query: string,
    parameterValues: Array<any>
  ): Promise<void> {
    try {
      return await this.connection.query(query, parameterValues);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private isEmptyResultSet(resultSet: Array<any>): boolean {
    return !resultSet || resultSet === undefined || resultSet.length === 0;
  }
}
