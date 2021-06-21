import {Identifiable} from "./Identifiable";
import {Parking} from "./Parking";
import {User} from "./User";


export interface Booking extends Identifiable {
  id: number;
  parking: Parking;
  user: User;
  from: string;
  to: string;
  bookingStatus: Booking.KeyEnum;
}

export namespace Booking {
  export type KeyEnum = 'RESERVED' | 'CANCELLED';
  // @ts-ignore
  export const KeyEnum = {
    Reserved: 'PREZIME' as KeyEnum,
    Cancelled: 'CANCELLED' as KeyEnum,
  };
}
