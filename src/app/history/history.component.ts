import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  /*
  // there is a unique key for search history
  searchHistory: Observable<any[]>;
  */
  
  searchHistory: any[];

  constructor(private historyService: HistoryService) { 

  }

  ngOnInit() {
    this.historyService.getSearchHistory().subscribe(
      (history) => {
        this.searchHistory = history;
      },
      (error) => {
        console.log('Failed to get search history!');
      }
    );
    
    /*
    // there is a unique key for search history
    this.searchHistory = this.historyService.getSearchHistory();
    */
  }

}
