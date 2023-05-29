import RepositoryFactory from "../../application/factory/repository_factory";
import SimulateFreight from "../../application/usecase/simulate_feight";

export default class UsecaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  createSimulateFreight() {
    return new SimulateFreight(this.repositoryFactory);
  }
}
