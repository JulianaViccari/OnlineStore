import PasswordMD5 from "../../../src/domain/entities/password_MD5";
import PasswordPBKDF2 from "../../../src/domain/entities/password_PBkDF2";
import PasswordPlain from "../../../src/domain/entities/password_palin";

test("should create password with plain test", function () {
  const password = PasswordPlain.create("123");
  expect(password.validate("123")).toBe(true);
});

test("should create password with pbkdf2", function () {
  const password = PasswordPBKDF2.create("123");
  expect(password.validate("123")).toBe(true);
});

test("should create password with md5", function () {
  const password = PasswordMD5.create("123");
  expect(password.validate("123")).toBe(true);
});
