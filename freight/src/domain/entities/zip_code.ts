import Coord from "./coord";

//Aggregate root - entity
export default class ZipCode {
    coord: Coord;
  
    constructor(
        readonly code: string, 
        readonly lat: number,
        readonly longi: number
        ){
            this.coord = new Coord(lat, longi)
        }
}