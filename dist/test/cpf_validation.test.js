"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cpf_validation_1 = require("../src/cpf_validation");
test.each([
    "407.302.170-27",
    "684.053.160-00",
    "746.971.314-01"
])("should test cpf validated %s", function (cpf) {
    const isValid = (0, cpf_validation_1.validate)(cpf);
    expect(isValid).toBeTruthy();
});
test.each([
    "406.302.170-37",
    "406.302.170",
    "406"
])("should test cpf not validated %s", function (cpf) {
    const isValid = (0, cpf_validation_1.validate)(cpf);
    expect(isValid).toBeFalsy();
});
test.each([
    "111.111.111-11",
    "222.222.222-22",
    "333.333.333-33"
])("should test if cpf numbers iquals %s", function (cpf) {
    const isValid = (0, cpf_validation_1.validate)(cpf);
    expect(isValid).toBeFalsy();
});
//# sourceMappingURL=cpf_validation.test.js.map