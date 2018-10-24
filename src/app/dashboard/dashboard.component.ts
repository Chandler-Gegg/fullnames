import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  //I added this
  names: any[];

  constructor(private dashboardService: DashboardService) {
    this.searches = [];
    //I added this
    this.names = [];
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  searchFullNames() {
    console.log("searchFullNames");
  }

  addName(firstName: string, lastName: string) {
    console.log("dashboard  componenet calling dashboard service addName()");
    this.dashboardService.addName(firstName, lastName);
  }

  ngOnInit() {
  }

}
