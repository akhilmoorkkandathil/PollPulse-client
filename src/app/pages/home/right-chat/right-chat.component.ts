import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-chat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './right-chat.component.html',
  styleUrl: './right-chat.component.css'
})
export class RightChatComponent {

  newMessage: string = '';

  

  messages = [
    { content: 'Hello! How can I help you today?', sentByUser: false },
    { content: 'I need some information regarding the event.', sentByUser: true },
  ];

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ content: this.newMessage, sentByUser: true });
      this.newMessage = ''; // Reset input field
      this.scrollToBottom(); // Auto scroll to latest message
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatContent = document.getElementById('chat-content');
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    }, 100);
  }

}
