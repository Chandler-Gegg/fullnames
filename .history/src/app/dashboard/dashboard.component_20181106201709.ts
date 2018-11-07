import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  constructor(
    private dashboardService: DashboardService,
    private http: HttpClient,
    ) {
      this.http.get(``);
    this.searches = [];

  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {
  }

}
