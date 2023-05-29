import GatewayFactory from "../../application/factory/gateway_factory";
import CatalogGateway from "../../application/gateway/catalog_gateway";
import FreightGateway from "../../application/gateway/freight_gateway";
import CatalogHttpGateway from "../gateway/catalog_http_gateway";
import FreightHttpGateway from "../gateway/freight_http_gateway";
import HttpClient from "../http/http_client";

export default class GatewayHttpFactory implements GatewayFactory{
    constructor(readonly httpClient: HttpClient){}
    createCatalogGateway(): CatalogGateway {
        return new CatalogHttpGateway(this.httpClient);
    }
    createFreightGateway(): FreightGateway {
        return new FreightHttpGateway(this.httpClient);
    }
    
}