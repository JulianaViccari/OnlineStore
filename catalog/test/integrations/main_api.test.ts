import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("should list products em json ", async function () {
  const response = await axios({
    url: "http://localhost:3001/products",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const output = response.data;
  expect(output).toHaveLength(4);
  expect(output.at(0)?.idProduct).toBe("1");
  expect(output.at(1)?.idProduct).toBe("2");
  expect(output.at(2)?.idProduct).toBe("3");
  expect(output.at(3)?.idProduct).toBe("4");
});

test("should list products em CSV ", async function () {
  const response = await axios({
    url: "http://localhost:3001/products",
    headers: {
      "Content-Type": "text/csv",
    },
  });
  const output = response.data;
  expect(output).toBe(
    "1;shampoo;17.0000/n2;shampoo;48.0000/n3;condicionador;22.0000/n4;sabonete;2.0000"
  );
});

test("should return one product", async function () {
  const response = await axios({
    url: "http://localhost:3001/products/1"
  });
  const output = response.data;
  expect(output.id).toBe("1");
  expect(output.name).toBe("Dove");
  expect(output.description).toBe("shampoo");
});
