"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(name, cpf, email, address) {
        this.name = name;
        this.email = email;
        this.address = address;
        //       if (!validate(cpf)) {
        //         throw new Error("cpf is invalid")
        //        }
        this.cpf = cpf;
    }
    getName() {
        return this.name;
    }
    getCpf() {
        return this.cpf;
    }
    getEmail() {
        return this.email;
    }
    getAddress() {
        return this.address;
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map