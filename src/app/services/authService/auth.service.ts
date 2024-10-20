import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { RegisterResponse } from '../../models/apiResponse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000'; // Your API endpoint

  constructor(private http: HttpClient) {}

  public register(user: User){    
    return this.http.post<RegisterResponse>(`${this.apiUrl}/api/v1/register`, user);
  }

  public verifyOtp(verifyData:{otp:string,email:string}){
    return this.http.post<RegisterResponse>(`${this.apiUrl}/api/v1/verifyOtp`, verifyData);
  }

  public login(user: User): Observable<any> {
    console.log("Login service");
    
    return this.http.post(`${this.apiUrl}/api/v1/login`, user);
  }
}
