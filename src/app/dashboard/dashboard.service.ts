import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
// import {switchMap} from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import { DashboardComponent } from './dashboard.component';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNamesRef: any; //added
  firstNameAddRef: any;
  lastNameAddRef: any;
  firstNames: any[];
  lastNames: any[];
  searchRef: any;
  searchArray: any[];

 
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.searchRef = this.db.list(`currentSession/userUid`).valueChanges();


    //added
    this.firstNamesRef = this.db.list(`firstNames`).valueChanges();

    this.firstNamesRef.subscribe((fNames:any[]) => {
      //console.log(fNames);
      this.firstNames = fNames[0]['first-names'];
      this.lastNames = fNames[0]['last-names'];
    });  

    this.searchRef.subscribe((s: any[]) => {
      //console.log(s);
      this.searchArray = s[0]
      console.log(this.searchArray);
    
    });

  }

  searchNames() {

    this.firstNamesRef.subscribe((fNames:any[]) => {
      this.firstNames = fNames[0]['first-names'];
      this.lastNames = fNames[0]['last-names'];
    });  

    }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  addNameToDatabase(firstName: string, lastName: string) {
    
    var firstNameNew = {
      firstName: true
    }
    var lastNameNew = {
      lastName: true 
    }

    firebase.database().ref('firstNames').child('names').child('first-names').push(firstNameNew);
    firebase.database().ref('firstNames').child('names').child('last-names').push(lastNameNew);
  }

  addHistory(firstName: string, lastName: string) {
    let historyToAdd = firstName + lastName; 
    firebase.database().ref('currentSession').child('userUid').child('history').push(historyToAdd);
    
  }


  
}
