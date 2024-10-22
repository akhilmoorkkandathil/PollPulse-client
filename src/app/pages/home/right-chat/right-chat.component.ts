import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chatService/chat.service';
import { UserDataService } from '../../../services/userDataService/user-data.service';
import { FormateMessages } from '../../../interfaces/chatInterface';
import { User } from '../../../models/user.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-right-chat',
  standalone: true,
  imports: [FormsModule,CommonModule,MatSlideToggleModule],
  templateUrl: './right-chat.component.html',
  styleUrl: './right-chat.component.css'
})
export class RightChatComponent {

  newMessage: string = '';
  messages: FormateMessages[]=[];
  userData:User | null = null;
  status:boolean = true;
  buttonName:string = 'Disable Chat'


  constructor(
    private chatService: ChatService, 
    private userDataService:UserDataService,
  ){}
  ngOnInit() {
    this.chatService.connect();
    this.fetchMessages()
    this.getUserData()
    this.fetchOldChats()
    this.scrollToBottom()
  }

  toggle(){
    this.status = !this.status
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
    this.userData = this.userDataService.getUserData()
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

}
