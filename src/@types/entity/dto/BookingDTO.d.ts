import {Identifiable} from "../Identifiable";
import {Parking} from "../Parking";
import {Booking} from "../Booking";

export interface BookingDTO extends Identifiable {
  parking: Parking;
  booking: Booking;
}
