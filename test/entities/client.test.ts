import Client from "../../src/entities/client";


test("should created new Client", function () {
    let client = new Client(
        "Henrique Viccari",
        "67464608607",
        "h.v@gmail.com",
        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
    );

    expect(client.getName()).toBe("Henrique Viccari");
    expect(client.getAddress()).toBe("rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    expect(client.getCpf()).toBe("67464608607");
    expect(client.getEmail()).toBe("h.v@gmail.com");


})

//test("not shold created new Client, because invalid CPF", function () {
//    expect(new Client(
//        "Henrique Viccari",
//        "12312312",
//        "h.v@gmail.com",
//        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
//    )).toThrow("cpf is invalid");
//})