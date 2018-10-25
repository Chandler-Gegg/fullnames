import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNames: any;
  lastNames: any;

  constructor(private loginService: LoginService,
              private db: AngularFireDatabase,) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNames = this.db.list(`names/first-names`);
    this.lastNames = this.db.list(`names/last-names`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  searchFirstNames() {
    this.firstNames
    return this.firstNames;  }
}

  searchLastNames() {
  this.firstNames
  return this.firstNames;  }
}
