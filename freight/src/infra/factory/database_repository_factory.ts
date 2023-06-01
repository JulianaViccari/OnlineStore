import DatabaseConnection from "../database/database_connection";
import RepositoryFactory from "../../application/factory/repository_factory";
import ZipCodeRepository from "../../application/repository/zip_code_repository";
import ZipCodeMYSQLRepository from "../repository/zip_code_mysql_repository";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {}
  
  createZipCodeRepository(): ZipCodeRepository {
    return new ZipCodeMYSQLRepository(this.connection);
  }
  
}
