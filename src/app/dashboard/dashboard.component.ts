/**
 * Xiao Lin
 * hw_wk7url: https://github.com/NicopandaLim/fullnames
 * 
 * Dashboard component successfully implement following functionalities:
 * 1. DASHBOARD CONTAINS INPUT FOR FIRST NAME, INPUT FOR LAST NAME, AND TWO BUTTONS [ADD NAME] [SEARCH FULLNAME]
 * 2. CLICKING THE “SEARCH FULLNAME” BUTTON SEARCHES THE DATABASE FOR VALID FIRST AND LASTNAMES.
 * 3. IF IT IS A VALID FULLNAME A NOTIFICATION IS DISPLAYED “JANE DOE DOES EXITS!”
 * 4. IF THE FULLNAME OR PART OF THE NAME IS NOT FOUND IN DATABASE A BUTTON IS ENABLED TO ADD THE MISSING NAME 
 *    OR PART OF THE NAME TO THE CORRECT DATABASE LIST
 * 
 */

import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of} from 'rxjs'; 
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  searches: any[];
  firstNamesRef: Observable<any>;
  firstName: string;
  lastName: string;
  nameValid: boolean;

  constructor(private dashboardService: DashboardService, private db: AngularFireDatabase) {
    this.searches = [];

  }

  searchName(firstName: string, lastName: string) {
    console.log(firstName);
    console.log(lastName);
    this.dashboardService.recordSearch(firstName, lastName);
    this.getName(firstName, lastName).subscribe(isValid => {
      this.nameValid = isValid;
    });
  }

  addName(firstName: string, lastName: string) {
    this.db.list('names/first-names').set(firstName, true);
    this.db.list('names/last-names').set(lastName, true);
    console.log(firstName + ' ' + lastName + 'added successfully.');
  }

  getName(firstName: string, lastName: string) {
    var fname = this.db.object('names/first-names/' + firstName).snapshotChanges();
    var lname = this.db.object('names/last-names/' + lastName).snapshotChanges();

    return fname.switchMap(fname_ => 
      lname.switchMap(lname_ => {
        return of((fname_.payload.val() === true) && (lname_.payload.val() === true));
      })
    );
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {

  }

}
