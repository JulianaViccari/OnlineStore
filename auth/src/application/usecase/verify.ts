import TokenGenerate from "../../domain/entities/token_generate";
import UserMysqlRepository from "../../infra/repository/user_sql_repository";

export default class Verify {
  constructor() {}

  async execute(token: string): Promise<Output> {
    const tokenGenerate = new TokenGenerate("secret");
    const output = tokenGenerate.verify(token);
    return {
      email: output.email
    };
  }
}

type Output = {
  email: string;
};
