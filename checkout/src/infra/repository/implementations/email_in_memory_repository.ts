import EmailGateway from "../../../application/repository/email_gateway_interface";

export default class EmailInMemoryRepository implements EmailGateway {
  async send(
    subject: string,
    message: string,
    to: string,
    from: string
  ): Promise<void> {
    console.log(subject, message, to, from);
  }
}
