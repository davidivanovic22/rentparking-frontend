import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Booking} from "../../../@types/entity/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/bookings/`);
  }
  getAllByBookingStatusAndLocationCity(bookingStatus: Booking.KeyEnum, city: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/bookings/` + bookingStatus + `/` + city +`/booking_status_and_location_city`);
  }


  getAllBookingByUser(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/bookings/` + userId +`/user`);
  }

  getAllBookingDTO(city: string, from: Date, to:Date){
    if(from && to){
      return this.http.get<any>(`${environment.baseUrl}/bookings/`+ city +`/booking_dto` + `?from=`+ from+`&to=`+ to);
    }else{
      return this.http.get<any>(`${environment.baseUrl}/bookings/`+ city +`/booking_dto`);
    }
  }

  save(booking:any): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/bookings`, booking);
  }

  update(booking: any): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/bookings`, booking);
  }

 automaticChangeBookingStatus(): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/bookings/automatic_change_booking_status`, undefined);
  }

  getById(bookingId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/bookings/` + bookingId);
  }
}
