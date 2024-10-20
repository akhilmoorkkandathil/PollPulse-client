import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-left-poll',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './left-poll.component.html',
  styleUrl: './left-poll.component.css'
})
export class LeftPollComponent {
  selectedItem: any = null;

  participants = [
    { name: 'Event A', count: 120 },
    { name: 'Event B', count: 85 },
    { name: 'Event C', count: 200 },
    { name: 'Event D', count: 55 }
  ];

  selectPoll(item: any) {
    this.selectedItem = item;
  }

  // Method to go back to the list of polls
  backToList() {
    this.selectedItem = null;
  }

}
