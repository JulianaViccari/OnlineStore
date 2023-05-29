import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("should return simulate freight", async function () {
  
  const input = {
    product: [ 
      { volume: 0.03, density: 100, quantity: 1}
    ],
    from: "14620000", //cep origem
    to: "06445550", //cep destino
  };
  const response = await axios.post("http://localhost:3002/simulateFreight", input);
  const output = response.data;
  expect(output.freight).toBe(30);
});

