import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chatService/chat.service';
import { User } from '../../models/user.model';
import { UserDataService } from '../../services/userDataService/user-data.service';
import { FormateMessages, PollData, PollOption } from '../../interfaces/chatInterface';
import { ChartModule } from 'primeng/chart';
import { PollService } from '../../services/pollServices/poll.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { RightChatComponent } from './right-chat/right-chat.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ChartModule,ToastModule,RightChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[ChatService,MessageService]
})
export class HomeComponent implements OnInit {


  constructor( 
    private chatService: ChatService, 
    private userDataService:UserDataService,
    private messageService: MessageService, 
    private pollService:PollService,
    private router:Router){}

  userData:User | null = null;
  addPollStatus:boolean = false;
  count:number = 1;
  submissionStatus!:boolean;
  isSelected:boolean = false;
  newPoll:PollData = {
    question: '',
    createdBy:'',
    options: [
      { name: '', votes: 0 }
    ]
  };
  pollData!:PollData[];
  selectedOptionIndex: number | null = null;
  basicData: unknown;
  basicOptions: unknown;
  showGraph: boolean = false;
  selectedPoll: any;
  selectedOption: string | null = null;


  ngOnInit() {
    this.chatService.connect();
    this.getUserData()
    this.scrollToBottom()
    this.setupChartOptions();
    this.fetchPolls()
    this.chatService.listenForPollUpdates().subscribe(updatedPoll => {
      const index = this.pollData.findIndex(poll => poll._id === updatedPoll._id);
      if (index !== -1) {
        this.pollData[index] = updatedPoll; 
        if (this.selectedPoll && this.selectedPoll._id === updatedPoll._id) {
          this.selectedPoll = updatedPoll; 
          this.showChart(updatedPoll)
        }
      }
    });
    this.checkUserData()

  }

  checkUserData(){
    if(!this.userData){
      this.router.navigate(['/login'])
    }
  }
  

  fetchPolls() {
    this.pollService.fetchPolls().subscribe({
      next: (response) => {
        if (response) {
          this.pollData = response.data;  
          console.log('Poll data fetched:', this.pollData);
        } else {
          console.error('Failed to fetch polls:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching polls:', err);
      }
    });
  }
  

  getUserData(){
    this.userData = this.userDataService.getUserData()
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatContent = document.getElementById('chat-content');
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    }, 100);
  }

addOption() {
  this.count++
  this.newPoll.options.push({ name: '', votes: 0 });
}

onSubmit() {
  if (this.newPoll.question && this.newPoll.options.length > 0) {
    this.pollData.push({
      _id: this.generateUniqueId(),
      question: this.newPoll.question,
      options: this.newPoll.options,
      totalVotes: 0,
      createdBy: this.userData?._id, 
      submitted: []
    });

    if (this.userData) {
      this.newPoll.createdBy = this.userData._id;
    }
    console.log('New Poll Added:', this.newPoll);
    this.pollService.addPoll(this.newPoll).subscribe(
      response => {
        console.log('Poll added successfully:', response);
        this.addPollStatus = false;
      },
      error => {
        console.error('Error adding poll:', error);
      }
    );
    this.newPoll = {
      question: '',
      userId:'',
      options: [
        { name: '', votes: 0 }
      ]
    };

    this.addPollStatus = false;
  }
}
generateUniqueId() {
  return Math.random().toString(36).substring(2, 9);
}

showChart(poll: any): void {
  console.log(poll,this.userData?._id)
  
  this.selectedPoll = poll;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Prepare the labels and data based on the selected poll
    const labels = poll.options.map((option: any) => option.name);
    const data = poll.options.map((option: any) => option.votes);

    this.basicData = {
        labels: labels,
        datasets: [
            {
                label: 'Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)', 
                    'rgba(75, 192, 192, 0.2)', 
                    'rgba(54, 162, 235, 0.2)', 
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 159, 64)', 
                    'rgb(75, 192, 192)', 
                    'rgb(54, 162, 235)', 
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }
        ]
    };

    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    this.showGraph = true;
}

setupChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: documentStyle.getPropertyValue('--text-color')
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: documentStyle.getPropertyValue('--text-color-secondary')
                },
                grid: {
                    color: documentStyle.getPropertyValue('--surface-border'),
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: documentStyle.getPropertyValue('--text-color-secondary')
                },
                grid: {
                    color: documentStyle.getPropertyValue('--surface-border'),
                    drawBorder: false
                }
            }
        }
    };
}

goBackToPollList(): void {
  this.selectedOptionIndex = null;
  this.addPollStatus = false;
  this.showGraph = false;
  this.selectedPoll = null;
}
selectOption(pollId: string, selectedPolOption: PollOption,index:number) {
  this.isSelected = true;
  this.selectedOptionIndex = index; // S
  console.log(selectedPolOption, pollId);
  // Find the poll by pollId
  let selectedPoll: PollData | undefined = this.pollData.find(poll => poll._id === pollId);
  if (selectedPoll) {
    let votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');


if (votedPolls.includes(selectedPoll._id)) {
  return;
}
  
    const selectedOption = selectedPoll.options.find(option => option.name === selectedPolOption.name);

    if (selectedOption) {
      selectedOption.votes += 1;
      
      if (!selectedPoll.totalVotes) {
        selectedPoll.totalVotes = 0;  
      }
      selectedPoll.totalVotes += 1;

      if (!selectedPoll.submitted) {
        selectedPoll.submitted = []; 
      }
    }
  }
}

submitVote(selectedPoll:PollData) {
  this.selectedOptionIndex = null
  let votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');

if (!Array.isArray(votedPolls)) {
  votedPolls = [];
}

if (votedPolls.includes(selectedPoll._id)) {
  this.messageService.add({ severity: 'contrast', summary: 'Success', detail: "You have already voted for this poll!" });
  return;
}
  this.showChart(selectedPoll);
  if (this.userData?._id) {
    if (!selectedPoll.submitted) {
      selectedPoll.submitted = []; 
    }
    selectedPoll.submitted.push(this.userData._id);
  }
  this.chatService.submitVote(selectedPoll);
  votedPolls.push(selectedPoll._id);

localStorage.setItem('votedPolls', JSON.stringify(votedPolls));
  this.messageService.add({ severity: 'contrast', summary: 'Success', detail: "Votting Successfull!!!" });
}

addNewPoll():void{  
  this.count = 1;
  this.addPollStatus = true
}

logout() {
  this.router.navigate(['/login']);
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  this.userDataService.clearUserData();
}

}
