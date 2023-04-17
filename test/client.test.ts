import Client from "../src/client"

test("shold created new Client", function () {
    let clienNew = new Client(
        "Henrique Viccari",
        "67464608607",
        "h.v@gmail.com",
        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
    );

    expect(clienNew.getName()).toBe("Henrique Viccari");
    expect(clienNew.getAddress()).toBe("rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp");
    expect(clienNew.getCpf()).toBe("67464608607");
    expect(clienNew.getEmail()).toBe("h.v@gmail.com");


})

test("not shold created new Client, because invalid CPF", function () {
    expect(new Client(
        "Henrique Viccari",
        "12312312",
        "h.v@gmail.com",
        "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
    )).toThrow("cpf is invalid");
})