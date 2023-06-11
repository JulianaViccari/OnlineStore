import { pbkdf2Sync, randomBytes, createHash } from "crypto";
import Password from "./password";

export default class PasswordMD5 implements Password {
  constructor(readonly value: string, readonly salt: string) {}

  static create(password: string) {
    const value = createHash("md5").update(password).digest("hex");
    return new PasswordMD5(value, "");
  }

  static restore(password: string, salt: string) {
    return new PasswordMD5(password, salt);
  }

  validate(password: string) {
    const value = createHash("md5").update(password).digest("hex");
    return this.value === value;
  }
}
