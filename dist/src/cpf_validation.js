"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function isValidLength(cpf) {
    return cpf.length !== 11;
}
function allDigitsTheSame(cpf) {
    return cpf.split("").every(c => c === cpf[0]);
}
function removeNonDigits(cpf) {
    return cpf.replace(/\D/g, "");
}
function calculateDigit(cpf, factor) {
    let total = 0;
    for (const digit of cpf) {
        if (factor > 1)
            total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
}
function validate(cpf) {
    cpf = removeNonDigits(cpf);
    if (isValidLength(cpf))
        return false;
    if (allDigitsTheSame(cpf))
        return false;
    const dg1 = calculateDigit(cpf, 10);
    const dg2 = calculateDigit(cpf, 11);
    let actualCheckedDigits = cpf.slice(9);
    const checkedDigits = `${dg1}${dg2}`;
    return actualCheckedDigits == checkedDigits;
}
exports.validate = validate;
//# sourceMappingURL=cpf_validation.js.map