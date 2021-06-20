import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/locations/`);
  }

  save(location: any): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/locations`, location);
  }

  update(location: any): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/locations`, location);
  }

  getById(locationId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/locations/` + locationId);
  }
}
