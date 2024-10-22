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



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ChartModule,ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[ChatService,MessageService]
})
export class HomeComponent implements OnInit {


  constructor( private chatService: ChatService, private userDataService:UserDataService,private messageService: MessageService, private pollService:PollService){}

  userData:User | null = null;
  newMessage: string = '';
  messages: FormateMessages[]=[];
  addPollStatus:boolean = false;
  count:number = 1;
  submissionStatus!:boolean;
  newPoll:PollData = {
    question: '',
    createdBy:'',
    options: [
      { name: '', votes: 0 }
    ]
  };
  pollData!:PollData[];


  ngOnInit() {
    this.chatService.connect();
    this.fetchMessages()
    this.getUserData()
    this.fetchOldChats()
    this.scrollToBottom()
    this.setupChartOptions();
    this.fetchPolls()
    this.chatService.listenForPollUpdates().subscribe(updatedPoll => {
      const index = this.pollData.findIndex(poll => poll._id === updatedPoll._id);
      if (index !== -1) {
        this.pollData[index] = updatedPoll; // Update the specific poll
        if (this.selectedPoll && this.selectedPoll._id === updatedPoll._id) {
          this.selectedPoll = updatedPoll; // Update selected poll if it matches
        }
      }
    });

  }
  

  fetchPolls() {
    this.pollService.fetchPolls().subscribe({
      next: (response) => {
        if (response) {
          this.pollData = response.data;  // Assuming response.data contains the list of polls
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
  


  fetchOldChats(){
    this.chatService.fetchOldChats().subscribe(
      (res)=>{
        this.messages = res.data;
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }

  getUserData(){
    this.userDataService.userData$.subscribe(data => {
      this.userData = data; // Update local userData when it changes
    });
  }


  fetchMessages(){
    this.chatService.getMessages().subscribe((message) => {

      console.log("Messge recieve in the home compoinnetn",message);
      if(message.senderId!==this.userData?._id){
        this.messages.push({userName:message.userName, content: message.content, sentByUser: false });
      }
      this.scrollToBottom();
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.userData?.userName && this.userData?._id) {
        const messageObj = { senderId: this.userData._id, content: this.newMessage };
        this.chatService.sendMessage(messageObj);
        this.messages.push({ userName: this.userData.userName.toUpperCase(), content: this.newMessage, sentByUser: true });
        
        this.newMessage = '';
        this.scrollToBottom();
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

  

basicData: any;
basicOptions: any;
showGraph: boolean = false;
selectedPoll: any;
selectedOption: string | null = null;

addOption() {
  this.count++
  this.newPoll.options.push({ name: '', votes: 0 });
}

onSubmit() {
  if (this.newPoll.question && this.newPoll.options.length > 0) {
    // Push the new poll data to pollData array (or save to backend)
    this.pollData.push({
      _id: this.generateUniqueId(),
      question: this.newPoll.question,
      options: this.newPoll.options,
      totalVotes: 0,
      createdBy: this.userData?._id,  // Assuming you have a user ID
      submitted: []
    });

    if (this.userData) {
      this.newPoll.createdBy = this.userData._id; // Wrap it in an array if your schema expects an array
    }
    console.log('New Poll Added:', this.newPoll);
    this.pollService.addPoll(this.newPoll).subscribe(
      response => {
        console.log('Poll added successfully:', response);
        this.addPollStatus = false;
        // Perform any additional actions like showing a success message or resetting the form
      },
      error => {
        console.error('Error adding poll:', error);
        // Handle the error case
      }
    );
    // Reset form
    this.newPoll = {
      question: '',
      userId:'',
      options: [
        { name: '', votes: 0 }
      ]
    };

    // Optionally hide the form after submission
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
  this.addPollStatus = false;
  this.showGraph = false;
  this.selectedPoll = null;
}
selectOption(pollId: string, selectedPolOption: PollOption) {
  console.log(selectedPolOption, pollId);
  // Find the poll by pollId
  let selectedPoll: PollData | undefined = this.pollData.find(poll => poll._id === pollId);
  if (selectedPoll) {
    let votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');


// Check if the user has already voted for the selected poll
if (votedPolls.includes(selectedPoll._id)) {
  //this.messageService.add({ severity: 'contrast', summary: 'Success', detail: "You have already voted for this poll!" });
  return;
}
  
    // Find the selected option in the poll
    const selectedOption = selectedPoll.options.find(option => option.name === selectedPolOption.name);

    if (selectedOption) {
      // Increment the vote count for the selected option
      selectedOption.votes += 1;
      
      // Increment the total votes for the poll
      if (!selectedPoll.totalVotes) {
        selectedPoll.totalVotes = 0;  // Initialize totalVotes if undefined
      }
      selectedPoll.totalVotes += 1;

      // Optionally, update the submitted array if needed
      if (!selectedPoll.submitted) {
        selectedPoll.submitted = [];  // Initialize if undefined
      }
    }
  }
}

submitVote(selectedPoll:PollData) {
  let votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');

// Ensure that votedPolls is an array
if (!Array.isArray(votedPolls)) {
  votedPolls = [];
}

// Check if the user has already voted for the selected poll
if (votedPolls.includes(selectedPoll._id)) {
  this.messageService.add({ severity: 'contrast', summary: 'Success', detail: "You have already voted for this poll!" });
  return;
}
  this.showChart(selectedPoll);
  if (this.userData?._id) {
    if (!selectedPoll.submitted) {
      selectedPoll.submitted = []; // Ensure the submitted array exists
    }
    selectedPoll.submitted.push(this.userData._id);
  }
  this.chatService.submitVote(selectedPoll);
  votedPolls.push(selectedPoll._id);

// Update the votedPolls array in localStorage
localStorage.setItem('votedPolls', JSON.stringify(votedPolls));
  this.messageService.add({ severity: 'contrast', summary: 'Success', detail: "Votting Successfull!!!" });
}

addNewPoll():void{  
  this.count = 1;
  this.addPollStatus = true
}

}
