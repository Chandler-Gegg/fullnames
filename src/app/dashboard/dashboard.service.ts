import {Injectable} from '@angular/core';
import {LoginService} from '../login/login.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from "rxjs";

@Injectable()
export class DashboardService {
  searchHistoryRef: any;


  firstNamesRef: any;

  constructor(private loginService: LoginService,
              private db: AngularFireDatabase) {

    this.searchHistoryRef =
      this.db.list(`currentSession/${this.loginService.userUid}/searches`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getFirstNames() {
    this.firstNamesRef = this.db.list(`firstNames`)
      .valueChanges();

    return this.firstNamesRef;

  }

}
