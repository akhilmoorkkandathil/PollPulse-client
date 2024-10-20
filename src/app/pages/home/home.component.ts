import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chatService/chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/userService/user.service';
import { User } from '../../models/user.model';
import { UserDataService } from '../../services/userDataService/user-data.service';
import { FormateMessages } from '../../interfaces/chatInterface';
import { ChartModule } from 'primeng/chart';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[ChatService]
})
export class HomeComponent implements OnInit {


  constructor( private chatService: ChatService , private route: ActivatedRoute, private userService:UserService, private userDataService:UserDataService){}

  userData:User | null = null;
  newMessage: string = '';
  email:string = '';
  messages: FormateMessages[]=[];


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];  // Retrieve the email from the query params
    });
    this.chatService.connect();
    this.fetchMessages()
    this.getUserData()
    this.fetchOldChats()
    this.scrollToBottom()
    this.setupChartOptions();
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

  pollData = [
    {
        question: "What is the best programming language?",
        options: [
            { name: "JavaScript", votes: 45 },
            { name: "Python", votes: 30 },
            { name: "Java", votes: 20 },
            { name: "C++", votes: 15 }
        ],
        totalVotes: 110,
        createdBy: "64c72a1b5f1a2d233dddc44f"
    },
    {
        question: "Which is your favorite web framework?",
        options: [
            { name: "Angular", votes: 50 },
            { name: "React", votes: 40 },
            { name: "Vue.js", votes: 30 },
            { name: "Next.js", votes: 20 }
        ],
        totalVotes: 120,
        createdBy: "64c72a1b5f1a2d233dddc44f"
    }
];

basicData: any;
basicOptions: any;
showGraph: boolean = false;
selectedPoll: any;
selectedOption: string | null = null;


showChart(poll: any): void {
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
  this.showGraph = false;
  this.selectedPoll = null;
}
selectOption(optionId: string) {
  this.selectedOption = optionId;
}

submitVote() {
  if (this.selectedOption) {
    // Implement logic to submit the vote
    console.log(`Voted for option: ${this.selectedOption}`);
  }
}

}
