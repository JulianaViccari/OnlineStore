import { validate } from "../cpf_validation";

export default class Client {
    private name: string;
    private cpf: string;
    private email: string;
    private address: string;

    constructor(name: string, cpf: string, email: string, address: string
    ) {
        this.name = name;
        this.email = email;
        this.address = address;

 //       if (!validate(cpf)) {
//         throw new Error("cpf is invalid")
//        }

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
}