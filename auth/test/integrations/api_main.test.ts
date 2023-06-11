import axios from "axios";

axios.defaults.validateStatus = function () {
    return true;
  };
  
  test("should verify token", async function () {
    const input = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbnJpcXVlQGdtYWlsLmNvbSIsImlhdCI6MTY3NzY3NTYwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDB9.6N6ZjnwCYzEvBkbvYTznaXWjVtV2mK_S1G9X0XSA9Ds",
    };
    const response = await axios.post("http://localhost:3005/verify", input);
    const output = response.data;
    expect(output.email).toBe("henrique@gmail.com");
  });
  