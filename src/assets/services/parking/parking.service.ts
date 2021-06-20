import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/parkings/`);
  }

  save(parking: any): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/parkings`, parking);
  }

  update(parking: any): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/parkings`, parking);
  }

  getById(parkingId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/parkings/` + parkingId);
  }
}
