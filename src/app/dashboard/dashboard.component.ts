import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  fName: string;
  lName: string;
  match: boolean;
  search_or_add: boolean;
  constructor(private dashboardService: DashboardService) {
    this.searches = [];
    this.search_or_add = true;
  }

  search(){
    var results = this.dashboardService.search(this.fName, this.lName)
        .subscribe(match => {
          console.log(`match = ${match}`);
          this.displayResult(match);
        });
    this.dashboardService.updateHistory(this.fName, this.lName, 'searched');
  }

  addName(){
    this.dashboardService.addName(this.fName, this.lName);
    this.search_or_add = true;
    this.dashboardService.updateHistory(this.fName, this.lName, 'added');
  }

  displayResult(match: boolean){
    if(match == true){
      document.getElementById('result').innerHTML = `${this.fName} ${this.lName} IS a valid full name!`;
    } else {
      document.getElementById('result').innerHTML = `${this.fName} ${this.lName} IS NOT a valid full name!`;
      this.search_or_add = false;
    }
  }

  cancelAdd(){
      this.search_or_add = true;
      document.getElementById('result').innerHTML = "";
  }

  ngOnInit() {
  }

}
