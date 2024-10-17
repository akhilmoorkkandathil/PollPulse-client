import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  participants = [
    { name: 'Event A', count: 120 },
    { name: 'Event B', count: 85 },
    { name: 'Event C', count: 200 },
    { name: 'Event D', count: 55 }
  ];


  messages = [
    { content: 'Hello! How can I help you today?', sentByUser: false },
    { content: 'I need some information regarding the event.', sentByUser: true },
  ];

  selectedItem: any = null;
  chartData: any[] = [];
  chartLabels: string[] = [];
  
  newMessage: string = '';

  ngOnInit() {}

  selectPoll(item: any) {
    this.selectedItem = item;
  }

  // Method to update the chart based on poll results
  updateChart(poll: any) {
    this.chartLabels = poll.options;
    this.chartData = [{ data: poll.results }];
  }

  // Method to vote for a poll option (simple example)
  vote(option: string) {
    alert(`You voted for ${option}`);
  }

  // Method to go back to the list of polls
  backToList() {
    this.selectedItem = null;
  }

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
