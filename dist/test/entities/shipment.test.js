"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shipment_1 = __importDefault(require("../../src/entities/shipment"));
test("should created new Shipment", function () {
    let shipment = new shipment_1.default();
    expect(shipment.calculate()).toBe(10);
});
//# sourceMappingURL=shipment.test.js.map