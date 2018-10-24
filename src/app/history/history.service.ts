import { Injectable } from '@angular/core';
import { map, concatMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

import { LoginService } from '../login/login.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable()
export class HistoryService {

  constructor(
    private dashboardService: DashboardService, 
    private loginService: LoginService,
    private db: AngularFireDatabase) { 

  }

  getSearchHistory() {
    return this.dashboardService.getSearchHistory();
        
    /*
    // there is a unique key for search history
    return this.dashboardService.searchHistoryKeyObservable.pipe(
      concatMap(
        key => this.db.list(`currentSession/${this.loginService.userUid}/searches/${key}`).snapshotChanges().pipe(map(names => names))
      )
    );
    */
  }
}
