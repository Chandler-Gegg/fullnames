import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstNamesArr: any[];
  firstNameField: string;
  lastNameField: string;

  constructor(private dashboardService: DashboardService) {
    this.searches = [];
    this.firstNamesArr = [];
    this.firstNameField = '';
    this.lastNameField = '';
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  addName(){
    this.dashboardService.addNametoDB(this.firstNameField, this.lastNameField);
  }

  /*Function called when submit button is clicked.  Data not displayed on screen.*/
  doesNameExist(){
    this.dashboardService.isValidName(this.firstNameField, this.lastNameField);
  }


  ngOnInit() {

  }

}
