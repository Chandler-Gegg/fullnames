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
  fName: string;
  lName: string;
  match: boolean;
  constructor(private dashboardService: DashboardService) {
  }

  search(){
    var results = this.dashboardService.search(this.fName, this.lName)
        .subscribe(match => {
          this.displayResult(match);
          this.match = match;
        });
    this.dashboardService.updateHistory(this.fName, this.lName, 'searched');
  }

  addName(){
    if(!this.match){
      this.dashboardService.addName(this.fName, this.lName);
      this.dashboardService.updateHistory(this.fName, this.lName, 'added');
    } else {
        document.getElementById('result').innerHTML = `${this.fName} ${this.lName} already exists!`;
    }
  }

  displayResult(match: boolean){
    if(match == true){
      document.getElementById('result').innerHTML = `${this.fName} ${this.lName} IS a valid full name!`;
    } else {
      document.getElementById('result').innerHTML = `${this.fName} ${this.lName} IS NOT a valid full name!`;
    }
  }

  ngOnInit() {
  }

}
