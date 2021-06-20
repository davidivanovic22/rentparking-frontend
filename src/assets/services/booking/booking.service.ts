import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/bookings/`);
  }

  save(booking: any): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/bookings`, booking);
  }

  update(booking: any): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/bookings`, booking);
  }

  getById(bookingId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/bookings/` + bookingId);
  }
}
