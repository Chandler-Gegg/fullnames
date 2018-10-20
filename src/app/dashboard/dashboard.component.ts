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
  constructor(private dashboardService: DashboardService) {
    this.searches = [];
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  search(){
    this.dashboardService.search(this.fName,this.lName);


    this.dashboardService.search(this.fName,this.lName)
        .subscribe(match => {
          console.log(`match = ${match}`);
          this.match = match;
        });


    this.dashboardService.getDataTest().subscribe((item:any) => {
      console.log(item);
    });
  }

  addName(){
    this.dashboardService.addName(this.fName, this.lName);
  }

  ngOnInit() {
  }

}
