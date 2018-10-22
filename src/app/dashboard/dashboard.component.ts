import {Component, Input, OnInit} from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input('inputFirstName') inputFirstName: string;
  @Input('inputLastName') inputLastName: string;

  searches: any[];
  constructor(private dashboardService: DashboardService) {
    this.searches = [];
  }

  searchNames() {
    console.log(`searchNames Called: inputFirstName {inputFirstName},inputLastName {inputLastName} `);

  }
  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {
  }

}
