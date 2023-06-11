import AuthGateway from "../gateway/auth_gateway";
import CatalogGateway from "../gateway/catalog_gateway";
import FreightGateway from "../gateway/freight_gateway";

export default interface GatewayFactory {
    createCatalogGateway(): CatalogGateway;
    createFreightGateway(): FreightGateway;
    createAuthGateway(): AuthGateway;
}