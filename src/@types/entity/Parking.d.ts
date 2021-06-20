import {Identifiable} from "./Identifiable";

export interface Parking extends Identifiable {
  id: number;
  name: string;
  description: string;
  width: number;
  length: number;
}
