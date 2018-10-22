import {Injectable} from '@angular/core';
import {LoginService} from '../login/login.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNamesRef: any;

  CURRENT_SESSION_HISTORY_PATH: string;


  constructor(private loginService: LoginService,
              private db: AngularFireDatabase) {

    this.CURRENT_SESSION_HISTORY_PATH = `currentSession/${this.loginService.userUid}/searches`;

    console.log(this.CURRENT_SESSION_HISTORY_PATH);

    this.searchHistoryRef =
      this.db.list(this.CURRENT_SESSION_HISTORY_PATH);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getFirstNames() {
    this.firstNamesRef = this.db.list(`firstNames`)
      .valueChanges();

    return this.firstNamesRef;
  }


  getFirstName(name: string) {
    this.addSearchHistory(name);
    return this.db.object(`firstNames/${name}`)
      .valueChanges();
  }

  getLastName(name: string) {
    this.addSearchHistory(name);
    return this.db.object(`lastNames/${name}`)
      .valueChanges();
  }


  private addSearchHistory(searchTerm) {
    this.db
      .object(this.CURRENT_SESSION_HISTORY_PATH)
      .update({[Date.now()]:searchTerm});
  }

  insertFirstName(name: string) {
    this.addSearchHistory(name);

    if (name.trim()) {
      return this.db
        .object(`firstNames`)
        .update({[name] : true});
    }
  }

  insertLastName(name: string) {
    this.addSearchHistory(name);

    if (name.trim()) {
      return this.db
        .object(`lastNames`)
        .update({[name]: true});
    }
  }


}
