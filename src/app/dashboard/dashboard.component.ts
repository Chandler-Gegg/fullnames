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
  firstNameInput: string;
  lastNameInput: string;

  nameSearchResult: Object = null;

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
    if (!this.firstNameInput) {
      this.nameSearchResult = {display: "Please enter a first name to search"};
      return;
    }

    this.nameSearchResult = {display: `looking for ${this.firstNameInput}`};

    this.dashboardService.getFirstName(this.firstNameInput)
      .subscribe((item) => {
        if (item) {
          this.nameSearchResult = {display: `First name ${this.firstNameInput} exists!`};
        } else {
          this.nameSearchResult = {display: `Could not find first name ${this.firstNameInput}`};
        }
        console.log(item);
      });
  }

  onLastNameSearch() {
    if (!this.lastNameInput) {
      this.nameSearchResult = {display: "Please enter a last name to search"};
      return;
    }
    this.nameSearchResult = {display: `looking for ${this.lastNameInput}`};

    this.dashboardService.getLastName(this.lastNameInput)
      .subscribe((item) => {
        if (item) {
          this.nameSearchResult = {display: `Last name ${this.lastNameInput} exists!`};
        } else {
          this.nameSearchResult = {display: `Could not find last name ${this.lastNameInput}`};
        }
        console.log(item);
      });


  }
}
