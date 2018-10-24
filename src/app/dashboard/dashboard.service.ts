import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searchHistory`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  addFirstAndLastName(firstName: string, lastName: string) {
    const sessionPayloads: any = {};
    if (firstName) {
      sessionPayloads[`firstNames/${firstName}`] = true;
    }
    if (lastName) {
      sessionPayloads[`lastNames/${lastName}`] = true;
    }
    return this.db.database.ref().update(sessionPayloads);
  }

  searchFullName(firstName: string, lastName: string) {
    return this.db.object(`/firstNames/${firstName}`).valueChanges().pipe(
      mergeMap(
        _ => this.db.object(`lastNames/${lastName}`).valueChanges(),
        (first, last) => {
          if (first && last) {
            return true;
          }
          if (!first && !last) {
            throw Error("The first and last names were not found.")
          }
          if (!first) {
            throw Error("The first name was not found.")
          }
          if (!last) {
            throw Error("The last name was not found.")
          }
        }
      )
    )
  }

  addToSearchHistory(firstName: string, lastName: string) {
    var search = firstName + " " + lastName;
    this.db.object(`currentSession/${this.loginService.userUid}/searchHistory`)
    .update({[Date.now()]: search});
  }
}
