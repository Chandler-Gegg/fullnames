import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  searchHistory: any[];

  constructor(private historyService: HistoryService) { 
    this.historyService
    .getSearchHistory()
    .subscribe(search => {
      this.searchHistory = search;
      console.log(search);
    });
 }

  ngOnInit() {
  }

}
