import UserRepository from "../repository/user_repository_interface";
import RepositoryFactory from "../factory/repository_factory";
import TokenGenerate from "../../domain/entities/token_generate";

export default class Login {
  userRepository: UserRepository;
  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
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
