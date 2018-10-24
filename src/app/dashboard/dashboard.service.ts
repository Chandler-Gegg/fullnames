import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs';
import { database } from 'firebase';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNameRef: any; 
  lastNameRef: any; 
  stopwordsRef: any; 

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {

    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);

    /* 
    //this.firstNameRef = this.db.list(`names`).valueChanges();
    //this.firstNameRef = this.db.list(`names/first-names).valueChanges();
        
    this.firstNameRef.subscribe( (fNames:any[]) => {
      console.log(`fNames = ${fNames}`);
    });
    */
  }

  lookupName(fname: string, lname: string) {
    const obs1 = this.db.object(`names/first-names/${fname}`).snapshotChanges();
    const obs2 = this.db.object(`names/last-names/${lname}`).snapshotChanges();

    return obs1.switchMap(action1 =>
      obs2.switchMap(action2 => {
        //console.log(`action1.payload.val() = ${action1.payload.val()}`);
        //console.log(`action2.payload.val() = ${action2.payload.val()}`);
        return of((action1.payload.val() === true) && (action2.payload.val() === true));
      })
    );
  }

  addName(fname: string, lname: string) {
    this.db.list('names/first-names').set(fname, true);
    this.db.list('names/last-names').set(lname, true);
  }

  updateSearchHistory(fname: string, lname: string, edate: number) {

    this.searchHistoryRef.push(
        { 
          firstName: fname, 
          lastName: lname, 
          entryDate: edate
        }
      );
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }
}
