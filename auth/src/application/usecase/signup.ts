
import UserRepository from "../repository/user_repository_interface";
import User from "../../domain/entities/User";
import RepositoryFactory from "../factory/repository_factory";

export default class Signup {
    userRepository: UserRepository;
    constructor(readonly repositoryFactory: RepositoryFactory){
    this.userRepository = repositoryFactory.createUserRepository()
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


