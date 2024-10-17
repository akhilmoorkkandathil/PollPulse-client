import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent {
  user: User = { username: '',email:'', password: '' };
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}


  onRegister() {
    this.authService.register(this.user).subscribe(
      (response) => {
        this.messageService.add({ severity: 'contrast', summary: 'Success', detail: response.message });
        // Handle successful login, e.g., store token and redirect
       this.router.navigate(['/verify']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        this.messageService.add({ severity: 'contrast', summary: 'Error', detail: error.error.message});
      }
    );
  }
  login(){
    this.router.navigate(['/login']);
  }
}
