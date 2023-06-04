import UserRepository from "../../application/repository/user_repository_interface";
import User from "../../domain/entities/User";
import DatabaseConnection from "../database/database_connection";

export default class UserMysqlRepository implements UserRepository{
    constructor(readonly connection: DatabaseConnection){}
    async get(email: string): Promise<Array<User>>{
        try {
            const query = "select email, password, salt from users where email = ?";
            const [rows, _] = await this.connection?.query(query, [email]);
            const result = this.bind(rows, _)
            return result;
        } catch (error:any) {
            throw new Error(error.message)
            
        }
       ;
    }

    async create(user: User): Promise<void> {
        if (user === undefined) return undefined;
        try {
          const createUserSQL =
            "insert into users (email, password, salt) values(?, ?, ?)";
          const createUserParameters = [
            user.email.email,
            user.password.value,
            user.password.salt
          ];
          await this.execInsertStatement(createUserSQL, createUserParameters);
    
        } catch (error: any) {
            //console.log(error.message)
          throw new Error(error.message);
        }
    }

    private async execInsertStatement(
        query: string,
        parameterValues: Array<any>
      ): Promise<any> {
        try {
          return await this.connection.query(query, parameterValues);
        } catch (error: any) {
          throw new Error(error.message);
        }
    }

    private bind(rows: any[], fields: any[]): Array<User> {
        let result: Array<User> = [] 
        if (rows.length === 0) return result;
        for (const row of rows) {
          const { email, password, salt } = row;
          result.push(User.restore(email, password, salt));
        }

        return result;
      }
}
