import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNameRef: any;
  lastNameRef: any;

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase) 
  {
    this.searchHistoryRef = this.db
      .list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNameRef = this.db.list(`firstNames`);
    this.lastNameRef = this.db.list(`lastNames`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getFirstNames() {
    return this.firstNameRef.valueChanges();
  }

  getLastNames() {
    return this.lastNameRef.valueChanges();
  }
}
