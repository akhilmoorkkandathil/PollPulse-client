import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule,ToastModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
  providers: [MessageService]
})
export class OtpComponent {

  timeLeft: number = 60;
  interval: any;
constructor(private messageService: MessageService, private router:Router){}

  ngOnInit() {
    this.startTimer();
  }

  // This method starts the countdown timer
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval); // Stop the timer once time is up
      }
    }, 1000);
  }

  // Method to resend the OTP and restart the timer
  resendOTP() {
    // Logic to resend OTP goes here
    console.log('OTP resent');

    // Restart the timer
    this.timeLeft = 60;
    this.startTimer();
  }

  // This method automatically jumps to the next box
  onInput(currentInput: HTMLInputElement, nextInput: HTMLInputElement) {
    if (currentInput.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  // This method handles backspace to go to the previous input box
  onBackspace(currentInput: HTMLInputElement, previousInput: HTMLInputElement) {
    if (currentInput.value.length === 0 && previousInput) {
      previousInput.focus();
    }
  }

  submitOTP(otp1: string, otp2: string, otp3: string, otp4: string, otp5: string, otp6: string) {
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`; // Combine the values

    if (otp.length === 6) { // Check if OTP is complete
      console.log('OTP:', otp);
      this.router.navigate(['/login']);
    } else {
      this.messageService.add({ severity: 'contrast', summary: 'Error', detail: 'Please enter correct OTP'});
    }
  }
}

