import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstName: string;
  lastName: string;
  inDatabase: boolean;

  constructor(private dashboardService: DashboardService) {
  }

  searchFullNames(firstName: string, lastName: string) {
    console.log("Dashboard component is calling dashboard service searchFullNames()");
    this.dashboardService.logSearch(firstName, lastName);
    this.dashboardService.getName(firstName, lastName).subscribe( inDB => {
      console.log('inDatabase = ' + inDB);
      this.inDatabase = inDB;
      });
  }

  addName(firstName: string, lastName: string) {
    console.log("Dashboard component is calling dashboard service addName()");
    this.dashboardService.addName(firstName, lastName);
  }

  ngOnInit() {
  }
}
