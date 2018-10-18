import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService implements OnInit {

  searchHistoryRef: any;
  firstNamesRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNamesRef = this.db.object(`firstNames`);
  }
  ngOnInit(): void {
    this.getFirstNames();
  }
  
  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getFirstNames() {
    return this.firstNamesRef.valueChanges().subscribe(firstNames => console.log(Object.keys(firstNames)));
  }
}
