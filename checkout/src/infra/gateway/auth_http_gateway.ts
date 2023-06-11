import AuthGateway from "../../application/gateway/auth_gateway";
import HttpClient from "../http/http_client";

export default class AuthHttpGAteway implements AuthGateway{
    constructor(readonly httpClient: HttpClient){}

    async verify(token: string): Promise<any> {
        const output = await this.httpClient.post(`http://localhost:3005/verify`, {token});
        return output;
    }
    
}