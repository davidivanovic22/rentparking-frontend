import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/users/`);
  }

  save(user: any): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/users`, user);
  }

  update(user: any): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/users`, user);
  }

  updateRecordStatus(userId: number, recordStatus: number): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/users/` + userId + `/` + recordStatus, {});
  }

  getById(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/users/` + userId);
  }

}
