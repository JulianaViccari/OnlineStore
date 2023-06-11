import RepositoryFactory from "../../application/factory/repository_factory";
import Verify from "../../application/usecase/verify";

export default class UsecaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  createVerify() {
    return new Verify();
  }

}
