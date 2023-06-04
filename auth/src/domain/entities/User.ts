import Email from "./email";
import { pbkdf2Sync, randomBytes} from "crypto"
import Password from "./password";

export default class User {
    email: Email;

    private constructor(email: string, readonly password: Password ){
        this.email = new Email(email);
    }
    // static factory method 
    static create (email: string, password: string){
        return new User(email, Password.create(password))
    }

    static restore(email:string, hash: string, salt: string){
        return new User(email, Password.restore(hash, salt))
    }

    validatePassword(password:string){
        return this.password.validate(password);
    }
}


