import Shipment from "../../../src/domain/entities/shipment";

test("should created new Shipment", function () {
  let shipment = new Shipment();

  expect(shipment.calculate()).toBe(10);
});
