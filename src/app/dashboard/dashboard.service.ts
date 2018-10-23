import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService {

  searchHistoryRef: any;
  // for test...begin
  firstNamesRef: any;
  // for test...end

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  searchFirstName(firstName: string) {
    return this.db.object(`firstNames/${firstName}`).valueChanges();
  }

  searchLastName(lastName: string) {
    return this.db.object(`lastNames/${lastName}`).valueChanges();
  }

  // for test...begin
  testGetData() {
    this.firstNamesRef = this.db.list(`firstNames`).valueChanges().subscribe(
      (firstNames:any[]) => {
        console.log('get firstNames...begin');
        console.log(firstNames);
        console.log('get firstNames...end');
      }
    );

  }
}
