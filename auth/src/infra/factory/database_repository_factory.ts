import RepositoryFactory from "../../application/factory/repository_factory";
import UserRepository from "../../application/repository/user_repository_interface";
import DatabaseConnection from "../database/database_connection";
import UserMysqlRepository from "../repository/user_sql_repository";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {}
  createUserRepository(): UserRepository {
    return new UserMysqlRepository(this.connection)
  }
  
}
