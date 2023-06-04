import UserRepository from "../repository/user_repository_interface";

export default interface RepositoryFactory {
    createUserRepository(): UserRepository
}
