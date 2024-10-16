import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = { email: 'akhildasxyz@gmail.com', password: 'Akhil@123' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.user).subscribe(
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
