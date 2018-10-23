import {Component, Input, OnInit} from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() inputFirstName: string = "";
  @Input() inputLastName: string = "";
  firstNameFound: any = false;
  lastNameFound: any = false;

  searches: any[];
  constructor(private dashboardService: DashboardService) {
    this.searches = [];
  }

  searchNames() {
    console.log(
      `searchNames Called: `,
      `inputFirstName ${this.inputFirstName}`,
      `inputLastName ${this.inputLastName}`
    );

    if (this.inputFirstName ) {
      // BEGIN ASYNC
      this.dashboardService.firstNameSearch(this.inputFirstName).subscribe(n => {
        this.firstNameFound = n[0];
        console.log('firstNameFound:' + this.firstNameFound, JSON.stringify(n));
      });
      // END ASYNC
    } else {
      this.firstNameFound = false;
    }

    if (this.inputLastName) {
      // BEGIN ASYNC
      this.dashboardService.lastNameSearch(this.inputLastName).subscribe(n => {
        this.lastNameFound = n[0];
        console.log('lastNameFound:'+ this.lastNameFound, JSON.stringify(n));
      });
      // END ASYNC
    } else {
      this.lastNameFound = false;
    }
  }

  unlistedFirstName(){
    return (!this.firstNameFound && this.inputFirstName);
  }

  unlistedLastName(){
    return (!this.lastNameFound && this.inputLastName);
  }

  addNames() {
    if (this.unlistedFirstName()) {
      this.dashboardService.firstNameAdd(this.inputFirstName)
    }
    if (this.unlistedLastName()) {
      console.log('TODO need to add a lastName');
      this.dashboardService.lastNameAdd(this.inputLastName)
    }
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {
  }

}
