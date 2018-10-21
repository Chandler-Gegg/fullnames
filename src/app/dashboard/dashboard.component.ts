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
  firstName: string;
  firstNameResult: Object = null;
  lastName: string = "";

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

  onFirstNameSearch() {
    console.log(this.firstName);

    this.firstNameResult = {display: `looking for ${this.firstName}`};

    this.dashboardService.getFirstName(this.firstName)
      .subscribe((item) => {
        if (item) {
          this.firstNameResult = {display: `${this.firstName} exists!`};
        } else {
          this.firstNameResult = {display: `Could not find ${this.firstName}`};
        }
        console.log(item);
      });
  }

  onLastNameSearch() {
    console.log(this.lastName);

  }
}
