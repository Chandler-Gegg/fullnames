import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard/dashboard.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['../app.component.css', './history.component.css']
})
export class HistoryComponent implements OnInit {

  searchHistory: any;

  constructor(dashboardService: DashboardService) {


    dashboardService
      .getSearchHistory()
      .subscribe(history => {
        this.searchHistory = history;
      });
  }

  ngOnInit() {
  }

}
