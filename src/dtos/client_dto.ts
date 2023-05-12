export default class ClientDTO {
    name?: string;
    cpf?: string;
    email?: string;
    address?: string;

    constructor(name?: string, cpf?: string, email?: string, address?: string
    ) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.cpf = cpf;
    }
}