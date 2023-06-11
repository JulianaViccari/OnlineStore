import TokenGenerate from "../../domain/entities/token_generate";
import UserMysqlRepository from "../../infra/repository/user_sql_repository";

export default class Login {
  
  constructor(readonly userRepository: UserMysqlRepository) {
  }

  async execute(input: Input): Promise<Output> {
    const userList = await this.userRepository.get(input.email);
    if (userList.length === 0) throw new Error("User not found");
    const user = userList[0];

    if (user.validatePassword(input.password)) {
      const tokenGenerate = new TokenGenerate("secret");
      return {
        token: tokenGenerate.sign(user, input.date),
      };
    } else {
      throw new Error("Authentication failure");
    }
  }
}

type Input = {
  email: string;
  password: string;
  date: Date;
};

type Output = {
  token: string;
};
