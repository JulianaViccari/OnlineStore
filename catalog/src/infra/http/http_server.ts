// ponte entre interface adapter com framework and driver
export default interface HttpServer{
    on(method: string, url:string, callback: Function): void;
    lister(port: number):void
}