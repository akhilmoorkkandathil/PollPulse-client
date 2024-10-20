import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000'; // Your API endpoint

  constructor(private http: HttpClient) {}

  getUserData(data:{email:string}){
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/v1/userData`, data)
  }
}
