import Verify from "../../src/application/usecase/verify";
test("should verify token", async function () {
  const verify = new Verify();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbnJpcXVlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDB9.6N6ZjnwCYzEvBkbvYTznaXWjVtV2mK_S1G9X0XSA9Ds";
  const output = await verify.execute(token);
  expect(output.email).toBe("henrique@gmail.com");
});
