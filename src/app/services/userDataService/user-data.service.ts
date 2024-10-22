import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: User | null = null;

  constructor() {
    // Load user data from local storage on initialization
    this.loadUserDataFromStorage();
  }

  private loadUserDataFromStorage(): void {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
    }
  }

  setUserData(data: User): void {
    this.userData = data;
    localStorage.setItem('userData', JSON.stringify(data)); // Store in local storage
  }

  getUserData(): User | null {
    return this.userData;
  }

  clearUserData(): void {
    this.userData = null;
    localStorage.removeItem('userData'); // Clear from storage
  }
}
