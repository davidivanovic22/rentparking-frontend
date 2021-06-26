import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  private user: any | null = null;

  constructor(private http: HttpClient) { }

  getLoggedInUser(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/logged-in-user`, { responseType: 'json' });
  }


  getAllBookingForLoggedInUser(){
    return this.http.get<any>(`${environment.baseUrl}/logged-in-user/bookings`, { responseType: 'json' });
  }

}
