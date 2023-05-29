import DatabaseConnection from "../database/database_connection";
import RepositoryFactory from "../../application/factory/repository_factory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {}
  
}
