import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {


  private userDataSubject = new BehaviorSubject<User | null>(null);
  userData$ = this.userDataSubject.asObservable();

  updateUserData(user: User) {
    this.userDataSubject.next(user); // Update the user data
  }

}
