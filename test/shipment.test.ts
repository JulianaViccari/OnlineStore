import Shipment from "../src/shipment";

test("should created new Shipment", function () {
    let shipment = new Shipment();

    expect(shipment.calculate()).toBe(10);
})