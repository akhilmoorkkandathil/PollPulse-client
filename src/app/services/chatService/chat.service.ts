import { inject, Injectable } from '@angular/core';
import { ChatMessage, oldChatResponse, PollData } from '../../interfaces/chatInterface';
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

  // Add method to submit vote to the server
  public submitVote(poll: PollData): void {
    this.socket.emit('submitVote', poll);  // Emit the poll data to the server
  }

  // Add method to listen for poll updates from the server
  public listenForPollUpdates(): Observable<PollData> {
    return new Observable(observer => {
      this.socket.on('updatePoll', (updatedPoll: PollData) => {
        observer.next(updatedPoll);  // Emit updated poll data to the subscriber
      });

      return () => this.socket.off('updatePoll'); // Clean up when the observable is unsubscribed
    });
  }

  fetchOldChats(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/v1/oldChats`);
  }

}
