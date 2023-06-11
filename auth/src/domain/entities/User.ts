import Email from "./email";
import Password from "./password";
import PasswordPBKDF2 from "./password_PBkDF2";

export default class User {
  email: Email;

  private constructor(email: string, readonly password: Password) {
    this.email = new Email(email);
  }
  // static factory method
  static create(email: string, password: string) {
    return new User(email, PasswordPBKDF2.create(password));
  }

  static restore(email: string, hash: string, salt: string) {
    return new User(email, PasswordPBKDF2.restore(hash, salt));
  }

  validatePassword(password: string) {
    return this.password.validate(password);
  }
}
