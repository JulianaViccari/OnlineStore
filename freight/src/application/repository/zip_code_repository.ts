import ZipCode from "../../domain/entities/zip_code";

export default interface ZipCodeRepository{
    get(code:string): Promise<ZipCode | undefined>;
}