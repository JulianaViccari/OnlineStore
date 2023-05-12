import ClientDTO from "../dtos/client_dto";
import OrderDetailDTO from "../dtos/order_detail_dto";
import OrderDTO from "../dtos/order_dto";
import ProductDTO from "../dtos/product_dto";
import Client from "../entities/client";
import Order from "../entities/order";
import OrderDetail from "../entities/order_detail";
import Product from "../entities/product";

export default class OrderFactory {
  public static buildOrderDTO(order: Order): OrderDTO {
    const clientDTO = this.buildClientDTO(order.getClient())
    const orderDetailsDTO = this.buildOrderDetailsDTO(order.getDetails());
    const orderDTO = new OrderDTO(
      order.getId(),
      orderDetailsDTO,
      clientDTO,
      order.getAmount()
    );
    return orderDTO;
  }

  public static buildOrderDetailsDTO(
    orderDetails: Array<OrderDetail>
  ): Array<OrderDetailDTO> {
    const dtos: Array<OrderDetailDTO> = [];
    for (const detail of orderDetails) {
      const product = this.buildProductDTO(detail.getProduct());
      const orderDetailDTO = new OrderDetailDTO(product, detail.getQuantity());
      dtos.push(orderDetailDTO);
    }
    return dtos;
  }

  public static buildClientDTO(client: Client |undefined): ClientDTO {
    return new ClientDTO(
        client?.getName(), 
        client?.getCpf(), 
        client?.getEmail(),
        client?.getAddress()
    )
  }

  public static buildProductDTO(product: Product): ProductDTO {
    return new ProductDTO(
      product.getId(),
      product.getName(),
      product.getDescription(),
      product.getPrice(),
      product.getWidth(),
      product.getHeight(),
      product.getLength(),
      product.getWeight()
    );
  }
}
