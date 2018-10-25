import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstName: string;
  lastName: string;
  fullName: String[];
  constructor(private dashboardService: DashboardService) {
    this.searches = [];
    this.fullName = [];
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
      console.log(this.searches);
      console.log("***");

    });
  }

  ngOnInit() {
  }

  onSearchDatabase(): void {
    this.SearchFirstLastName(this.firstName, this.lastName);
    console.log(this.firstName);
    console.log(this.lastName);
  }

  SearchFirstLastName(firstName: string, lastName: string): void {
    console.log(this.dashboardService.firstNames);

    this.dashboardService.addHistory(firstName, lastName);
    this.historyDisplay();

    for (let f_name in this.dashboardService.firstNames) {
      if (f_name == firstName) {
        this.fullName.push(f_name);
      }
    }
    for (let l_name in this.dashboardService.lastNames) {
      if (l_name == lastName) {
        this.fullName.push(l_name);
      }
    }
    if (this.fullName.length == 2) {
      console.log(this.fullName + " is in the database");
      this.outputFullNameSearch(this.fullName);
    } else {
      document.getElementById("addNameButton").removeAttribute('disabled');
      this.displayMessageToAdd(this.firstName, this.lastName);
      this.addData();
    }
    this.firstName = '';
    this.lastName = '';
    this.fullName = [];
  }

  outputFullNameSearch(nameString: String[]) {
    document.getElementById("output").innerHTML = nameString + " is a valid name";
  }

  displayMessageToAdd(firstName: string, lastName: string) {
    document.getElementById("notFound").innerHTML = firstName + " " + lastName + " is not found in database, to add to database click ADD NAME";
  }
  
  addData() {
    this.dashboardService.addNameToDatabase(this.firstName, this.lastName);
  }
  
  historyDisplay() {
    var display = [];
    for (var searchDisplay in this.dashboardService.searchArray) {
      display.push(this.dashboardService.searchArray[searchDisplay]);
    }
    console.log(display);
    var displayString = display.toString();    
    document.getElementById("history").innerHTML = "user search history = " + displayString;
  }
 

}
