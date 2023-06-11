import { pbkdf2Sync, randomBytes, createHash } from "crypto";
import Password from "./password";

export default class PasswordPlain implements Password {
  constructor(readonly value: string, readonly salt: string) {}

  static create(password: string) {
    return new PasswordPlain(password, "");
  }

  static restore(password: string, salt: string) {
    return new PasswordPlain(password, salt);
  }

  validate(password: string) {
    return password === this.value;
  }
}
