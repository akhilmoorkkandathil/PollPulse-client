import { inject, Injectable } from '@angular/core';
import { ChatMessage, oldChatResponse } from '../../interfaces/chatInterface';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models/apiResponse.model';





@Injectable({
  providedIn: 'root'
})

export class ChatService {
  
  private apiUrl = 'http://localhost:8000'; 
  private accessToken: string | null = localStorage.getItem('accessToken');
  private refreshToken: string | null = localStorage.getItem('refreshToken');

   private socket;
  constructor(private http:HttpClient) { 
    
  this.socket = io('http://localhost:8000', {
    query: {
      token: this.accessToken,
      refreshToken: this.refreshToken,
    },
  }); }

  public connect() {
    console.log('Connecting socket');
    this.socket.connect();
  }

  public sendMessage(message: { senderId: string ; content: string }): void {
    this.socket.emit('sendMessage', JSON.stringify(message)); // Send message to server
  }

  public getMessages(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((observer) => {
      // Listen for 'receiveMessage' emitted from the server
      this.socket.on('receiveMessage', (data: ChatMessage) => {
        observer.next(data);
      });

      // Cleanup when unsubscribed
      return () => this.socket.off('receiveMessage');
    });
  }

  fetchOldChats(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/v1/oldChats`);
  }

}
