import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService implements OnInit {

  searchHistoryRef: any;
  firstNamesRef: any;
  lastNamesRef: any;
  firstNames: any[];
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNamesRef = this.db.list(`firstNames`);
    this.lastNamesRef = this.db.object(`lastNames`);
  }
  ngOnInit(): void {
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getFirstNames() {
    this.firstNamesRef.valueChanges().subscribe(names => console.log(names));
  }

  getLastNames() {
    return this.lastNamesRef.valueChanges();
  }

  addName(firstName: string, lastName: string) {
    this.db.list('firstNames').push({ [firstName] : true });
    this.db.list('lastNames').push({ [lastName] : true });
  }
}
