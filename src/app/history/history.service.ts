import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertService } from '../alert/alert.service';
import { map, concatMap } from 'rxjs/operators';
import { DashboardService } from '../dashboard/dashboard.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HistoryService implements OnInit {

  searchHistoryRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    private dashboardService: DashboardService
  ) {
    this.searchHistoryRef = `currentSession/${this.loginService.userUid}/searches/`;
  }

  ngOnInit () {
  }

  getSearchHistory() {
    return this.dashboardService.searchHistoryKey$.pipe(
      concatMap(key => {
        return this.db.list(`currentSession/${this.loginService.userUid}/searches/${key}`)
          .snapshotChanges().pipe(map(names => names));
      })
    );
  }
}
