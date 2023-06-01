import RepositoryFactory from "../factory/repository_factory";
import FreightCalculator from "../../domain/freight_calculator";
import ZipCodeRepository from "../repository/zip_code_repository";
import DistanceCalculator from "../../domain/distance_calculator";

// Use case - Application Service DDD
export default class SimulateFreight {
  zipCodeRepository: ZipCodeRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.zipCodeRepository = repositoryFactory.createZipCodeRepository();
  }

  async execute(input: Input): Promise<Output> {
    const output = {
      freight: 0,
    };
    for (const item of input.product) {
      if (input.from && input.to) {
        const from = await this.zipCodeRepository.get(input.from);
        const to = await this.zipCodeRepository.get(input.to);
        let distance = 1000;
        if (from && to) {
          distance = DistanceCalculator.calculate(from.coord, to.coord);
        }

        const freight = FreightCalculator.calculate(item, distance);
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
