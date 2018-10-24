import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  constructor(private loginService: LoginService, private db: AngularFireDatabase) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    console.log("DASHBOARDSERVICE constructor: ");
    console.log(`currentSession/${this.loginService.userUid}/searches`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  logSearch(firstName: string, lastName: string) {
    this.searchHistoryRef.push({ firstName: firstName, lastName: lastName});
    console.log(firstName + ' ' + lastName + ' pushed to searchHistoryRef.');
  }

  getName(firstName: string, lastName: string) {
    var first = this.db.object('names/first-names/' + firstName).snapshotChanges();
    var last = this.db.object('names/last-names/' + lastName).snapshotChanges();

    return first.switchMap(f => 
      last.switchMap(l => {
        return of((f.payload.val() === true) && (l.payload.val() === true));
      })
    );
  }

  addName(firstName: string, lastName: string) {
    console.log("DashboardService adding name %s %s to database.", firstName, lastName);
    this.db.list('names/first-names').set(firstName, true);
    this.db.list('names/last-names').set(lastName, true);
  }
}

// DONE: 2 inputs on dashboard:
//  Add Names pushes and writes data to fullnames DB collection
//  Search Full Names searches DB collection for names and prints text to say it exists or not
//  logSearch keeps track of search history
//  getSearchHistory returns search history