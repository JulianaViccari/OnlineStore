import { sign, verify } from "jsonwebtoken";
import User from "./User";

export default class TokenGenerate {
  EXPIRES_IN = 100000;
  constructor(readonly key: string) {}

  sign(user: User, date: Date) {
    return sign(
      {
        email: user.email.value,
        iat: date.getTime(),
        expiresIn: this.EXPIRES_IN,
      },
      this.key
    );
  }

  verify(token: string): any {
    return verify(token, this.key);
  }
}
