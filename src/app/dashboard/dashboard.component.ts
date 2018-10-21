import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AlertService } from '../alert/alert.service';
import { FailedName } from '../models/failed-name';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  // 2 way binding on respective inputs
  firstName = '';
  lastName = '';
  enableAdd = false;
  failedName: FailedName;
  constructor(private dashboardService: DashboardService, private alertService: AlertService) {
    this.searches = [];
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {
  }

  addName() {
    this.dashboardService.addName(this.failedName);
    this.enableAdd = false;
  }

  searchFullName() {
    const fn = this.firstName.toLowerCase();
    const ln = this.lastName.toLowerCase();
    this.dashboardService.searchFullName(fn, ln)
    .subscribe(
      _ => {
        this.alertService.success(`${fn} ${ln} is a valid name!`);
      },
      err => {
        this.enableAdd = true;
        this.failedName = new FailedName(fn, ln, err.message.toLowerCase());
        this.alertService.danger(`${this.failedName.getFailedName()} not found. Click 'add' to add it.`);
      }
    );
  }
}
