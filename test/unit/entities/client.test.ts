import Client from "../../../src/entities/client";

test("should created new Client", function () {
  let client = new Client(
    "Henrique Viccari",
    "407.302.170-27",
    "h.v@gmail.com",
    "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
  );

  expect(client.getName()).toBe("Henrique Viccari");
  expect(client.getAddress()).toBe(
    "rua 1, 55, bairro Felidz, cep: 14620-000, orlândia-Sp"
  );
  expect(client.getCpf()).toBe("407.302.170-27");
  expect(client.getEmail()).toBe("h.v@gmail.com");
});

test.each([
  "406.302.170-37",
  "406.302.170",
  "406"
])
("not should created new Client, because invalid CPF", function (cpf: string) {
  expect(
    () => new Client("", cpf, "", "")).toThrow("Invalid cpf");
});

test.each([
  "407.302.170-27",
  "684.053.160-00",
  "746.971.314-01"
])("should created new Client validated %s", function (cpf: string) {
  expect(
    () => new Client("", cpf, "", "")).toBeDefined();
});
