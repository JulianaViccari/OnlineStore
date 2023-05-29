export default interface DatabaseConnection {
  //fica entre Framework and Drive e interface adapter (camada de fronteira) mais do lado de interface adapter (contrato)
  connect(): Promise<void>;
  query(statement: string, params?: Array<any>, callback?: any): Promise<any>;
  close(): Promise<void>;
}
