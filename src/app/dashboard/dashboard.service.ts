import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNamesRef: any; 
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNamesRef = this.db.list('firstNames').valueChanges();
    this.firstNamesRef.subscribe((fnames: any[]) => {
      console.log(fnames);
    })
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

}
