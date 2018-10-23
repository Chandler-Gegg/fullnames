import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import {dateformat} from 'dateformat/lib/dateformat';


@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNamesListRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db
      .list(`currentSession/${this.loginService.userUid}/searches`);
    // this.firstNamesListRef = this.db.list('firstNames', ref => ref.orderByKey().equalTo('Kathy')).valueChanges();
    // this.firstNamesListRef.subscribe((fnames: any[]) => {
    //   console.log("name: " + fnames);
    // });
  }

  firstNameAdd(firstName: string){
    const theList = this.db.list('firstNames');
    return theList.set(firstName, 'true');
  }

  lastNameAdd(lastName: string){
    const theList = this.db.list('lastNames');
    return theList.set(lastName, 'true');
  }

  searchAdd(firstName: string, lastName: string){
    console.log('To support previous session search, store search history at',
      'this.loginService.sessionKey', this.loginService.sessionKey)
    console.log('searchAdd: ', firstName, lastName)
    // const serverTimestampFlag = firebase.database.ServerValue.TIMESTAMP;
    var dateTimeKey = this.getDateKey();
    console.log('dateTimeKey',dateTimeKey);
    const searchTerms = { 'firstName': firstName, 'lastName': lastName};
    this.searchHistoryRef.set(dateTimeKey, searchTerms);
    // const theList = this.db.list('lastNames');
    // return theList.set(lastName, 'true');
  }

  getDateKey(){
    var now = Date.now();
    return now.toString();

  }
  firstNameSearch(firstName: string){
    const theQuery = this.db.list('firstNames',
      ref => ref.orderByKey().equalTo(firstName));
    return theQuery.valueChanges();
  }

  lastNameSearch(lastName: string){
    const theQuery = this.db.list('lastNames',
      ref => ref.orderByKey().equalTo(lastName));
    return theQuery.valueChanges();
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

 debugDir(tag: string, anObject: any) {
    console.log(`${tag}:${anObject}`);
    console.dir(anObject);
    console.log(typeof anObject);
  }

}
