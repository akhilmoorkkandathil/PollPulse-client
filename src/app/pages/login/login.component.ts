import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserDataService } from '../../services/userDataService/user-data.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  user: User = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router,private messageService: MessageService, private userDataService: UserDataService) {}

  onLogin() {
    console.log("loginclicked");
    console.log(this.user);
    
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log(response);
        this.userDataService.setUserData(response.data.user)
        
        localStorage.setItem('accessToken',response.data.accessToken);
        localStorage.setItem('refreshToken',response.data.refreshToken);
        // Handle successful login, e.g., store token and redirect
        this.messageService.add({ severity: 'contrast', summary: 'Success', detail: response.message });
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: error.error.message});
      }
    );
  }

  register(){
    this.router.navigate(['/register']);
  }

}
