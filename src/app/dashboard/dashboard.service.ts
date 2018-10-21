import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { mergeMap, map } from 'rxjs/operators';
import { FailedName } from '../models/failed-name';
import { AlertService } from '../alert/alert.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DashboardService implements OnInit {

  searchHistoryRef: any;
  firstNamesRef: any;
  lastNamesRef: any;
  private _searchHistoryKey = new BehaviorSubject<string>(null);
  searchHistoryKey$ = this._searchHistoryKey.asObservable();
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    private alertService: AlertService
  ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNamesRef = this.db.list('names/first-names');
    this.lastNamesRef = this.db.list(`names/last-names`);
  }
  ngOnInit(): void {
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  addName(failedName: FailedName) {
    if (failedName.firstFailed()) {
      this.add(this.db.object('names/first-names'), failedName.firstName);
    }
    if (failedName.lastFailed()) {
      this.add(this.db.object('names/last-names'), failedName.lastName);
    }
  }

  add(ref: any, name: string) {
    ref.update({ [name]: true })
      .then(
        _ => this.alertService.success(`Sucessfully added ${name}`),
        e => this.alertService.danger(`Unable to add ${name}`)
      );
  }

  searchFullName(firstName: string, lastName: string) {
    return this.db.object(`names/first-names/${firstName}`).valueChanges().pipe(
      mergeMap(
        _ => this.db.object(`names/last-names/${lastName}`).valueChanges(),
        (first, last) => {
          this.addToHistory(`${firstName} ${lastName}`);
          if (first && last) {
            return true;
          }
          else if (first == null && last == null) {
            throw Error('both');
          }
          else {
            throw Error(first ? 'last' : 'first');
          }
        }
      )
    );
  }

  addToHistory(name: string) {
    if (this._searchHistoryKey.value) {
      this.searchHistoryRef.update(this._searchHistoryKey.value, { [name]: true });
    }
    else {
     this.searchHistoryRef.push({ [name]: true })
     .then(item => this._searchHistoryKey.next(item.key));
    }
  }
}
