import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  disableAddNameBtn: boolean = true;
  isFirstNameValid: boolean;
  isLastNameValid: boolean;
  message: string = null;

  searches: any[];

  constructor(private dashboardService: DashboardService) {
    this.searches = [];
  }

  ngOnInit() {
    this.dashboardService.testGetData();
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  searchFullName() {
    if (this.firstName.length === 0 || this.lastName.length === 0) {
      return;
    }

    // check if first name is valid
    this.dashboardService.searchFirstName(this.firstName).subscribe(
      (itemFirstName) => {
        this.isFirstNameValid = (itemFirstName == true ? true : false);
        console.log(`first name: ${this.firstName}-->${itemFirstName}`);
        
        // check if last name is valid
        this.dashboardService.searchLastName(this.lastName).subscribe(
          (itemLastName) => {
            this.isLastNameValid = (itemLastName == true ? true : false);
            console.log(`last name: ${this.lastName}-->${itemLastName}`);

            // construct the message
            if (this.isFirstNameValid && this.isLastNameValid) {
              this.message = `${this.firstName} ${this.lastName} is a valid full name!`;
            } else if (this.isFirstNameValid) {
              this.message = `${this.lastName} is not a valid last name!`;
            } else if (this.isLastNameValid) {
              this.message = `${this.firstName} is not a valid first name!`;
            } else {
              this.message = `${this.firstName} ${this.lastName} is not a valid full name!`;
            }

            // enable add name button
            if (this.isFirstNameValid && this.isLastNameValid) {
              this.disableAddNameBtn = true;
            } else {
              this.disableAddNameBtn = false;
            }
            
          }
        );
      }
    );
    
  }
}
