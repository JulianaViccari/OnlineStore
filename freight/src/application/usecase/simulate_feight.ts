import RepositoryFactory from "../factory/repository_factory";
import FreightCalculator from "../../domain/entities/freight_calculator";

export default class SimulateFreight {
  constructor(repositoryFactory: RepositoryFactory) {}

  async execute(input: Input): Promise<Output> {
    const output = {
      freight: 0,
    };
    for (const item of input.product) {
      if (input.from && input.to) {
        const freight = FreightCalculator.calculate(item);
        output.freight += freight * item.quantity;
      }
    }
    return output;
  }
}

type Input = {
  product: { volume: number; density: number; quantity: number }[];
  from?: string;
  to?: string;
};

type Output = {
  freight: number;
};
