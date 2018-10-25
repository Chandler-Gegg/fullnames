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
    this.dashboardService.getSearchHistory().subscribe( (history: any) => { 

      // sorting history according to time stamp. Latest search first and old search last.   
      history = history.sort((x,y) => {
        return y.entryDate - x.entryDate
      })

      this.searches = history;
    });
  }

  ngOnInit() {
  }

}
