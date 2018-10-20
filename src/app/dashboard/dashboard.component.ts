import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AlertService } from '../alert/alert.service';

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
  successMessage = '';
  constructor(private dashboardService: DashboardService, private alertService: AlertService) {
    this.searches = [];
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {
   // this.dashboardService.getFirstNames();
  }

  addName() {
    // this.dashboardService.addName(this.firstName, this.lastName);
    console.log(`Adding ${this.firstName} ${this.lastName}`);
  }

  searchFullName() {
    const fn = this.firstName.toLowerCase();
    const ln = this.lastName.toLowerCase();
    this.dashboardService.searchFullName(fn, ln)
    .subscribe(
      isValid => {
        this.alertService.success(`${fn} ${ln} is a valid name!`);
      },
    err => this.alertService.danger(err)
    );
  }
}
