import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstNames: any[];
  lastNames: any[];

  constructor(private dashboardService: DashboardService) {
    this.searches = [];
    this.firstNames = [];
    this.lastNames = [];
    console.log("DATABASE DATA");
    this.getFirstNames();
    this.getLastNames();
    console.log("DATABASE DATA");
  }

  //  add the write to the history of searches
  performSearch() {

  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe((history: any) => {
      this.searches = history;
    });
  }

  getFirstNames() {
    this.dashboardService.getFirstNames().subscribe((fNames: any[]) => {
      console.log(fNames);
    });
  }

  getLastNames() {
    this.dashboardService.getLastNames().subscribe((lNames: any[]) => {
      console.log(lNames);
    });
  }
 
  ngOnInit() {
  }
}
