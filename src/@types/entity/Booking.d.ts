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
  export type KeyEnum = 'RESERVED' | 'CANCELLED' | 'PENDING' | 'WAITING' | 'RESCHEDULED' | 'FREE';
  // @ts-ignore
  export const KeyEnum = {
    Reserved: 'PREZIME' as KeyEnum,
    Cancelled: 'CANCELLED' as KeyEnum,
    Pending: 'PENDING' as KeyEnum,
    Waiting: 'WAITING' as KeyEnum,
    Rescheduled: 'RESCHEDULED' as KeyEnum,
    Free: 'FREE' as KeyEnum,
  };
}
