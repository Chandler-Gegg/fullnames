import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstNamesRef: any[];

  constructor(private dashboardService: DashboardService) {
    this.searches = [];
    this.firstNamesRef = [];

    console.log("DATABASE DATA");
    this.getLastName();
    console.log("DATABASE DATA");
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  getFirstName() {
    this.dashboardService.getFirstNames().subscribe((fNames: any[]) => {
      console.log(fNames);
    });
  }

  getLastName() {
    this.dashboardService.getLastNames().subscribe((fNames: any[]) => {
      console.log(fNames);
    });
  }

  ngOnInit() {
  }
}
