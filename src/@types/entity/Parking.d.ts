import {Identifiable} from "./Identifiable";
import {Location} from "./Location";

export interface Parking extends Identifiable {
  id: number;
  name: string;
  description: string;
  parkingPic: string;
  width: number;
  length: number;
  price: number;
  location: Location;
}
