import {Identifiable} from "./Identifiable";

export interface Location extends Identifiable {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}
