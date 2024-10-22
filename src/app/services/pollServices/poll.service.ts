import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../models/apiResponse.model';
import { PollData } from '../../interfaces/chatInterface';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  public addPoll(pollData: PollData){    
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/v1/addPoll`, pollData);
  }
  public fetchPolls(){    
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/v1/fetchPolls`);
  }


}
