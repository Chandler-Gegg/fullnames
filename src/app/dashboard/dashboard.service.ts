import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  //this will be a reference to our database list
  firstNamesRef: Observable<any>;
  lastNamesRef: Observable<any>;
  searchHistoryRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNamesRef = this.db.list('names').valueChanges();
    this.lastNamesRef = this.db.list('names').valueChanges();
    this.getFirstNames();
  }


  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getFirstNames() {
    //this unpacks our collection so we get back the json object.
    //it's an observable, and it lazy loads, so nothing happens till we subscripbe to it.
    console.log("dashboard service read first names from database:");
    this.firstNamesRef.subscribe((fNames: any[]) => console.log(fNames));
  }

  getLastNames() {
    console.log("dashboard service read last names from database: ");
    this.lastNamesRef.subscribe((lNames: any[]) => console.log(lNames));
  }

  addName(firstName: string, lastName: string) {
    console.log("DashboardService adding name %s %s to database.", firstName, lastName);
  }
}

//TODO: 2 inputs on dash
//add names; pushes and writes data to collections
//...?
//if name exists, print text that says it exists
//keep track of search history--history component--displays search history

//there are some e.c. options
