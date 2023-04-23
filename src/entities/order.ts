import Client from "./client";
import OrderDetail from "./order_detail";

export default class Order {
    private id: string;
    private client: Client;
    private productList: Array<OrderDetail>;

    constructor(id: string, client: Client, productList: Array<OrderDetail>
    ) {
        this.id = id;
        this.client = client;
        this.productList = productList;
    }

    getId(): string {
        return this.id;
    }

    getClientCpf(): string {
        return this.client.getCpf();
    }

    getClientAddress(): string {
        return this.client.getAddress();
    }

    getAmount(): number {
        let total = 0;
        this.productList.forEach(orderDetail => {
            total += orderDetail.getProductAmount();
        })
        return total;
    }
}