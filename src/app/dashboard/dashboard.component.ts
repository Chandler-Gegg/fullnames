import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '../app.component.css',
  ]
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstNamesRef: any;
  firstNameInput: string;
  lastNameInput: string;

  nameResult: Object = null;

  constructor(private dashboardService: DashboardService,
              private router: ActivatedRoute) {

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
      this.nameResult = {display: "Please enter a first name to search"};
      return;
    }

    this.nameResult = {
      display: `looking for ${this.firstNameInput}`,
      name: `${this.firstNameInput}`
    };

    this.dashboardService.getFirstName(this.firstNameInput)
      .subscribe((item) => {
        if (item) {
          this.nameResult = {
            display: `First name ${this.firstNameInput} exists!`
          };
        } else {
          this.nameResult = {
            display: `Could not find first name ${this.firstNameInput}`,
            name: `${this.firstNameInput}`,
            showCreate: true,
            type: "first"
          };
        }
        console.log(item);
      });
  }

  onLastNameSearch() {
    if (!this.lastNameInput) {
      this.nameResult = {display: "Please enter a last name to search"};
      return;
    }

    this.nameResult = {
      display: `looking for ${this.firstNameInput}`,
      name: `${this.firstNameInput}`
    };

    this.dashboardService.getLastName(this.lastNameInput)
      .subscribe((item) => {
        if (item) {
          this.nameResult = {display: `Last name ${this.lastNameInput} exists!`};
        } else {
          this.nameResult = {
            display: `Could not find last name ${this.lastNameInput}`,
            name: `${this.lastNameInput}`,
            showCreate: true,
            type: "last"
          };
        }
        console.log(item);
      });
  }

  insertName(name, type) {
    let dbInsertPromise;
    switch (type) {
      case "last" :
        dbInsertPromise = this.dashboardService.insertLastName(name);
        break;
      case "first":
        dbInsertPromise = this.dashboardService.insertFirstName(name);
        break;
    }

    if (dbInsertPromise) {
      dbInsertPromise
        .then( e=> {
          this.nameResult = {
            name: name,
            type: type,
            display: `Successfully inserted ${type} name: ${name}`
          };
        })
        .catch(error => console.error(error));
    }


  }
}
