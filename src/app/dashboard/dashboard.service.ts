import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of, concat } from 'rxjs';

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

  updateHistory(fName: string, lName: string, operation: string) {
    this.searchHistoryRef.push({ firstName: fName, lastName: lName, action: operation });
  }

  search(fName: string, lName: string) {
      const obs1 = this.db.object(`/firstNames/${fName}`).snapshotChanges();
      const obs2 = this.db.object(`/lastNames/${lName}`).snapshotChanges();
      return obs1.switchMap(action1 =>
        obs2.switchMap(action2 => {
            return of((action1.payload.val() === true) && (action2.payload.val() === true));
        }));
    }

  addName(fName: string, lName: string){
    this.db.list('/firstNames').set(fName, true);
    this.db.list('/lastNames').set(lName, true);
  }
}
