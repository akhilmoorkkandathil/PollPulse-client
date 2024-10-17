import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RippleModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  providers: [MessageService]

})
export class LandingComponent {
  constructor(private router: Router, private messageService: MessageService) {}

  login() {
    // Programmatically navigate to the login route
    this.router.navigate(['/login']);
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}
}
