import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
  }

  recordSearch(firstName: string, lastName: string) {
    this.searchHistoryRef.push({firstName: firstName, lastName: lastName});
    console.log('Search of ' + firstName + lastName + ' recorded successfully');
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }
}
