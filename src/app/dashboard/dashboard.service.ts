import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) 
  {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    console.log("DATABASE DATA");
    
    console.log("DATABASE DATA");
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }
}
