export default class Client {
//   value: string;

  constructor(
    readonly name: string,
    readonly cpf: string,
    readonly email: string,
    readonly address: string
  ) {
    if (!this.validate(cpf)) throw new Error("Invalid cpf");
    this.name = name;
    this.email = email;
    this.address = address;
    this.cpf = cpf;
  }

  getName(): string {
    return this.name;
  }

  getCpf(): string {
    return this.cpf;
  }

  getEmail(): string {
    return this.email;
  }

  getAddress(): string {
    return this.address;
  }

  isValidLength(cpf: string) {
    return cpf.length !== 11;
  }

  allDigitsTheSame(cpf: string) {
    return cpf.split("").every((c) => c === cpf[0]);
  }

  removeNonDigits(cpf: string) {
    return cpf.replace(/\D/g, "");
  }

  calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  validate(cpf: string) {
    cpf = this.removeNonDigits(cpf);
    if (this.isValidLength(cpf)) return false;
    if (this.allDigitsTheSame(cpf)) return false;
    const dg1 = this.calculateDigit(cpf, 10);
    const dg2 = this.calculateDigit(cpf, 11);
    let actualCheckedDigits = cpf.slice(9);
    const checkedDigits = `${dg1}${dg2}`;
    return actualCheckedDigits == checkedDigits;
  }
}
