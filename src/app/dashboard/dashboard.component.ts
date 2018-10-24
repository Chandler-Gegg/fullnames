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
  addFirstNameMessage: string = null;
  addFirstNameSucc: boolean;
  addLastNameMessage: string = null;
  addLastNameSucc: boolean;
  
  searches: any[];

  constructor(private dashboardService: DashboardService) {
    this.searches = [];
  }

  ngOnInit() {
    
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  searchFullName() {
    this.clearMessages();

    if (this.firstName.length === 0 || this.lastName.length === 0) {
      return;
    }

    // check if first name is valid
    let firstNamesRef = this.dashboardService.searchFirstName(this.firstName).subscribe(
      (itemFirstName) => {
        this.isFirstNameValid = (itemFirstName == true ? true : false);
        console.log(`first name: ${this.firstName}-->${itemFirstName}`);
        
        // check if last name is valid
        let lastNamesRef = this.dashboardService.searchLastName(this.lastName).subscribe(
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
            
            firstNamesRef.unsubscribe();
            lastNamesRef.unsubscribe();

            // add searched name to search history
            this.addNameToSearchHistory();
          }
        );
      }
    );
    
  }

  addName() {
    // disable add name button
    this.disableAddNameBtn = true;

    if (!this.isFirstNameValid) { // if first name is invalid, add the first name to firstNames list of firebase
      this.dashboardService.addFirstName(this.firstName).then(
        (_) => {
          this.addFirstNameMessage = `${this.firstName} has been successfully added to firstNames collection in Firebase!`;
          this.addFirstNameSucc = true;
        },
        (error) => {
          this.addFirstNameMessage = `Failed to add ${this.firstName} to firstNames collection in Firebase!`;
          this.addFirstNameSucc = false;
        }
      );
    }

    if (!this.isLastNameValid) { // if last name is invalid, add the last name to firebase
      this.dashboardService.addLastName(this.lastName).then(
        (_) => {
          this.addLastNameMessage = `${this.lastName} has been successfully added to lastNames collection in Firebase!`;
          this.addLastNameSucc = true;
        },
        (error) => {
          this.addLastNameMessage = `Failed to add ${this.lastName} to lastNames collection in Firebase!`;
          this.addLastNameSucc = false;
        }
      );
    }
  }

  clearMessages() {
    this.message = null;
    this.addFirstNameMessage = null;
    this.addLastNameMessage = null;
  }

  addNameToSearchHistory() {
    this.dashboardService.addNameToSearchHistory(this.firstName, this.lastName).then(
      (_) => {},
      (error) => {
        console.log(`Failed to add ${this.firstName} ${this.lastName} to search history!`);
      }
    );

    /*
    // there is a unique key for search history
    let name = `${this.firstName} ${this.lastName}`;
    this.dashboardService.addNameToSearchHistory(name);
    */
  }
}
