import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard/dashboard.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

   searchHistory: any;

  constructor(dashboardService: DashboardService) {
    debugger;
    // dashboardService
    //   .getSearchHistory()
    //   .subscribe(history => {
    //     console.log(history);
    //   });
  }

  ngOnInit() {
  }


}
