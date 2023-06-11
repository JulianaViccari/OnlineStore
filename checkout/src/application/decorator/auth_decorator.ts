import GatewayFactory from "../factory/gateway_factory";
import AuthGateway from "../gateway/auth_gateway";
import Usecase from "../usecase/usecase";

export default class AuthDecorator implements Usecase{
  authGateway: AuthGateway;

    constructor(readonly usecase: Usecase, gatewayFactory: GatewayFactory){
        this.authGateway = gatewayFactory.createAuthGateway();
    }

    async execute(input: any): Promise<any> {
        if (input.token) {
            const session = await this.authGateway.verify(input.token);
            if(!session) throw new Error("Authentication failure")
          }
        return this.usecase.execute(input);
    }
    
}