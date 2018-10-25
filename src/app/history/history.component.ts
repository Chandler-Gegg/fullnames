/**
 * Xiao Lin
 * hw_wk7url: https://github.com/NicopandaLim/fullnames
 * 
 * History component successfully implement following functionalities:
 * 1.DISPLAY THE USER SEARCH HISTORY
 * 2.(Extra Credit)SORT SEARCH HISTORY BY TIMESTAMP
 * 
 */

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  searches: any[];
  constructor(private dashboardService: DashboardService) { 
    this.searchHistory();
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (searchHistory: any) => {
      this.searches = searchHistory;
    })
  }

  ngOnInit() {
  }

}
