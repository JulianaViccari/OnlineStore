

import User from "../../domain/entities/User";
import UserMysqlRepository from "../../infra/repository/user_sql_repository";

export default class Signup {
    constructor(readonly userRepository: UserMysqlRepository){
    }
    async execute(input: Input): Promise<void> {
        const user = User.create(input.email, input.password)
        await this.userRepository.create(user)
	}
}

type Input = {
    email: string,
    password: string
}


