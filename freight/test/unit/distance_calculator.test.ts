import DistanceCalculator from "../../src/domain/distance_calculator";
import Coord from "../../src/domain/entities/coord";

test("Should calculate the distance between two convicts", function () {
  const from = new Coord(-27.5945, -48.5477);
  const to = new Coord(-22.9129, -43.2003);
  const distance = DistanceCalculator.calculate(from, to);
  expect(distance).toBe(748.2217780081631);
});
