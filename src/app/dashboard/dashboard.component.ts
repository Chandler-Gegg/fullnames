import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstName: string;
  lastName: string;
  message: string;
 
  constructor(
    private dashboardService: DashboardService,
    private router: Router) {
    this.searches = [];
  }

  onSearchFullName() {
    console.log("searching for names: " + this.firstName + "; last: " + this.lastName);
    if (this.firstName && this.lastName) {
      this.dashboardService.addToSearchHistory(this.firstName, this.lastName);
      this.dashboardService.searchFullName(this.firstName, this.lastName)
      .subscribe(
        _ => {
          this.message = this.firstName + " " + this.lastName + " is a valid name.";
        },
        err => {
          this.message = err.message;
        }
      );
    }
    else {
      this.message = "Please enter both a first and last name to search";
    }

    return false;
  }

  onAddNames() {
    console.log("adding names first: " + this.firstName + "; last: " + this.lastName);
    if (this.firstName || this.lastName) {
      this.dashboardService.addFirstAndLastName(this.firstName, this.lastName)
          .then(() => {
            console.log("first and last name added");
            this.message = "";
            if (this.firstName) {
              this.message = this.firstName + " has been added to the firstNames collection. ";
            }
            if (this.lastName) {
              this.message = this.message + this.lastName + " has been added to the lastNames collection. ";
            }
            this.message = this.firstName + " " + this.lastName + " have been added.";
            this.firstName = "";
            this.lastName = "";
          })
          .catch( error => {
            console.log(error);
            this.router.navigate(['/dashboard']);
        });
    }
    else {
      this.message = "Please enter a first and last name to search by."
    }
    return false;
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {
  }

}
