import CatalogGateway from "../gateway/catalog_gateway";
import FreightGateway from "../gateway/freight_gateway";

export default interface GatewayFactory {
    createCatalogGateway(): CatalogGateway;
    createFreightGateway(): FreightGateway;
}