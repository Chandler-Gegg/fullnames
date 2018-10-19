import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  updateSearchHistory(fname: string, lname: string) {
    this.searchHistoryRef.push({ firstName: fname, lastName: lname });
  }

  // DATABASE TEST
  getDataTest() {
    return this.db.list('firstNames').valueChanges();
  }

  lookupName(fname: string, lname: string) {
    const obs1 = this.db.object(`firstNames/${fname}`).snapshotChanges();
    const obs2 = this.db.object(`lastNames/${lname}`).snapshotChanges();

    return obs1.switchMap(action1 =>
      obs2.switchMap(action2 => {
        return of((action1.payload.val() === true) && (action2.payload.val() === true));
      })
    );
  }

  addName(fname: string, lname: string) {
    this.db.list('firstNames').set(fname, true);
    this.db.list('lastNames').set(lname, true);
  }
}
