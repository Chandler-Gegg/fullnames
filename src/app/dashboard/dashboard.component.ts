import { Component, OnInit } from '@angular/core';
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
  match: boolean;
  addDisabled: boolean;
  nameSearch: boolean;
  nameAdded: boolean;

  constructor(private dashboardService: DashboardService) {

    this.addDisabled = true; // Add name button disable before searching 
    this.nameSearch = false; // Do not show result until search button clicked 
    this.nameAdded = false; // Do not show message until new name add to database 
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
      console.log(`History = ${ this.searches }`);
    });
  }

  doSearch (first: string, last: string) {
    this.nameSearch = true; // show result either name is found or not 
    this.nameAdded = false; // do not show name added message 
    this.dashboardService.updateSearchHistory(first, last, Date.now());

    this.dashboardService.lookupName(first, last)
        .subscribe(match => {
          console.log(`match = ${match}`);
          this.match = match; // name not found in database 
          this.addDisabled = match; // enable name add button if name not found 
        });
  }
  
  addName(first: string, last: string) {
    this.dashboardService.addName(first, last);
    this.nameSearch = false; // do not show result until search button clicked  
    this.nameAdded = true; // Show message, name has been added to database  
    this.addDisabled = true; // Disabled name add button after adding new name to database 
  }

  ngOnInit() {
  }

}
