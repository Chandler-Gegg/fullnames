import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNamesListRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
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
