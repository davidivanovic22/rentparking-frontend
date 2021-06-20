import {Identifiable} from "./Identifiable";
import {Parking} from "./Parking";
import {User} from "./User";
import {BookingStatus} from "./data/BookingStatus";


export interface Booking extends Identifiable {
  id: number;
  parking: Parking;
  user: User;
  from: string;
  to: string;
  bookingStatus: BookingStatus;
}
