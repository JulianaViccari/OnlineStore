import ZipCodeRepository from "../../application/repository/zip_code_repository";
import ZipCode from "../../domain/entities/zip_code";
import DatabaseConnection from "../database/database_connection";

export default class ZipCodeMYSQLRepository implements ZipCodeRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async get(code: string): Promise<ZipCode | undefined> {
    try {
      const query = "select code, lat, longi from zip_codes where code = ?";
      const [rows, _] = await this.connection?.query(query, [code]);
      const result = this.bind(rows, _);
      return result.length > 0 ? result[0] : undefined;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private bind(rows: any[], fields: any[]): Array<ZipCode> {
    let empty: Array<ZipCode> = [];
    if (rows.length === 0) return empty;
    const result: Array<ZipCode> = [];
    for (const row of rows) {
      const { code, lat, longi } = row;
      result.push(new ZipCode(code, lat, longi));
    }

    return result;
  }
}
