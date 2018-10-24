import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class HistoryService {

  constructor(private loginService: LoginService,
    private db: AngularFireDatabase) { }

    
  getSearchHistory() {
    return this.db.list(`currentSession/${this.loginService.userUid}/searchHistory`).valueChanges();
  }

}
