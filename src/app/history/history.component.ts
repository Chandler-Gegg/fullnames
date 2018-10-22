import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})


export class HistoryComponent implements OnInit {
  searches: any[];
  searchFlag: boolean
  constructor(
    private loginService: LoginService,
    private dashboardService: DashboardService,
    private db: AngularFireDatabase) {
      this.searches = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
      this.searchFlag = false;
    }

    searchHistory() {
        this.dashboardService.getSearchHistory().subscribe( (history: any) => {
        this.searches = history;
      });
    }

    sortHistory(){
      if(!this.searchFlag)
        this.searchFlag = true;
      else
        this.searchFlag = false;
      var i = 0;
      for(i = 0; i < this.searches.length; i++){
        var j = 0;
        for( j = i; j < this.searches.length; j++){
          if (this.searchFlag){
            if(parseInt(this.searches[i].timestamp) < parseInt(this.searches[j].timestamp))
              this.swap(i, j);
          }
          else if(!this.searchFlag){
            if(parseInt(this.searches[i].timestamp) > parseInt(this.searches[j].timestamp))
              this.swap(i, j);
          }
        }
      }
    }
    
    swap(a: number, b: number){
      var swap = this.searches[a];
      this.searches[a] = this.searches[b];
      this.searches[b] = swap;
    }

  ngOnInit() {
    this.searchHistory();
  }
}
