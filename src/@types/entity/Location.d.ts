import {Identifiable} from "./Identifiable";

export interface Location extends Identifiable {
  id?: number;
  name: string;
  address: string;
  city: string;
  longitude: number;
  latitude: number;
}
