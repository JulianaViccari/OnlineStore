import { pbkdf2Sync, randomBytes, createHash } from "crypto";
import Password from "./password";

export default class PasswordPBKDF2 implements Password {
  constructor(readonly value: string, readonly salt: string) {}

  static create(password: string) {
    const salt = randomBytes(20).toString("hex");
    const value = pbkdf2Sync(password, salt, 64, 100, "sha512").toString("hex");
    return new PasswordPBKDF2(value, salt);
  }

  static restore(password: string, salt: string) {
    return new PasswordPBKDF2(password, salt);
  }

  validate(password: string) {
      const value = pbkdf2Sync(password, this.salt, 64, 100, "sha512").toString(
        "hex"
      );
      return this.value === value;
  }
}
