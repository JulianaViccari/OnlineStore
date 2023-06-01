import ZipCodeRepository from "../repository/zip_code_repository";

export default interface RepositoryFactory {
    createZipCodeRepository(): ZipCodeRepository
}
