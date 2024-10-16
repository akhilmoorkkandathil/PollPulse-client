import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/apiResponse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:80'; // Your API endpoint

  constructor(private http: HttpClient) {}

  register(user: User){
    return this.http.post<ApiResponse>(`${this.apiUrl}/register`, user);
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
}
