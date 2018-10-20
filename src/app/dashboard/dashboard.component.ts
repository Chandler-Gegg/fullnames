import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstNamesRef: any;

  constructor(private dashboardService: DashboardService) {
    this.searches = [];
  }

  searchHistory() {
    this.dashboardService
      .getSearchHistory()
      .subscribe((history: any) => {
        this.searches = history;
      });
  }

  ngOnInit() {
    this.firstNamesRef = this.dashboardService.getFirstNames();

    this.firstNamesRef
      .subscribe((firstNames: any[]) => {
        console.log(firstNames);
      });
  }

}
