import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = { username: 'Akhil',email:'akhildasxyz@gmail.com', password: 'Akhil@123' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.register(this.user).subscribe(
      (response) => {
        // Handle successful login, e.g., store token and redirect
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
}
