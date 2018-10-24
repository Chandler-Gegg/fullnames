import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DashboardService {

  searchHistoryRef: any;
  searchHistoryKey = new BehaviorSubject<string>(null);
  searchHistoryKeyObservable = this.searchHistoryKey.asObservable();

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
    return this.db.object(`names/first-names/${firstName}`).valueChanges();
    //return this.db.object(`firstNames/${firstName}`).valueChanges();
  }

  searchLastName(lastName: string) {
    return this.db.object(`names/last-names/${lastName}`).valueChanges();
    //return this.db.object(`lastNames/${lastName}`).valueChanges();
  }

  addFirstName(firstName: string) {
    let item = {};
    item[`${firstName}`] = true;

    return this.db.object(`names/first-names`).update(item);
    //return this.db.object(`firstNames`).update(item);
    //return this.db.object(`firstNames`).update({[name] : true});
  }

  addLastName(lastName: string) {
    let item = {};
    item[`${lastName}`] = true;

    return this.db.object(`names/last-names`).update(item);
    //return this.db.object(`lastNames`).update(item);
  }

  addNameToSearchHistory(firstName: string, lastName: string) {
    return this.searchHistoryRef.push({firstName: firstName, lastName: lastName});
  }
  /*
  addNameToSearchHistory(name: string) {
    // there is a unique key for search history
    if (this.searchHistoryKey.value) {
      this.searchHistoryRef.update(this.searchHistoryKey.value, { [name]: true }).then(
        (_) => {},
        (error) => {
          console.log(`Failed to add ${name} to search history!`);
        }
      );
    } else {
      this.searchHistoryRef.push({ [name]: true }).then(
        (item) => {
          this.searchHistoryKey.next(item.key);
        },
        (error) => {
          console.log(`Failed to add ${name} to search history!`);
        }
      );
    }
  }
  */
  
}
