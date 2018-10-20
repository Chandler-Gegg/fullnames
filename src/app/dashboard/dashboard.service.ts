import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class DashboardService implements OnInit {

  searchHistoryRef: any;
  firstNamesRef: any;
  lastNamesRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
  ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNamesRef = this.db.list('names/first-names');
    this.lastNamesRef = this.db.object(`lastNames`);
  }
  ngOnInit(): void {
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getFirstNames() {
    // this.firstNamesRef.valueChanges().subscribe(x => console.log(x));
  }

  getLastNames() {
    // return this.lastNamesRef.valueChanges();
  }

  addName(firstName: string, lastName: string) {
    this.db.list('firstNames').push({ [firstName]: true });
    this.db.list('lastNames').push({ [lastName]: true });
  }

  searchFullName(firstName: string, lastName: string) {
    return this.db.object(`names/first-names/${firstName}`).valueChanges().pipe(
      mergeMap(
        _ => this.db.object(`names/first-names/${lastName}`).valueChanges(),
        (first, last) => {
          if (first && last) {
            return true;
          }
          else {
            const invalidName = first ? lastName : firstName;
            throw Error(`${invalidName} is not in the database`);
          }
        }
      )
    );
  }
}
