import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstValid: boolean;
  lastValid: boolean;
  showResults: boolean;
  // first and last names are @Input properties so we can reset them to false when user changes fields
  // and reset showResults to false
  private _firstName: string;
  private _lastName: string;
  @Input ('firstName') 
  set firstName(n:string) { 
    this._firstName = n;
    this.showResults = false;
  }
  get firstName() {return this._firstName; }
  @Input ('lastName') 
  set lastName(n:string) { 
    this._lastName = n;
    this.showResults = false;
  }
  get lastName() {return this._lastName; }
  constructor(private db: AngularFireDatabase, private loginService: LoginService, private dashboardService: DashboardService) {
    //console.log("Dashboard constructor");
    this.searches = [];
    this.showResults = false;
  }
    addToDB() {
        this.showResults = false;
        var firsts = this.db.object('firstNames');
        var lasts = this.db.object('lastNames');
        firsts.update( {[this.firstName]:"true"} );
        lasts.update( {[this.lastName]:"true"} );
        console.log("Add " + this.firstName + this.lastName + " to DB"); 
    }
  searchDB() {
    this.showResults = true;
    this.dashboardService.localHist.push(this.firstName + " " + this.lastName);
    //reset valids to false
    this.firstValid = this.lastValid = false;
    console.log("Search for " + this.firstName + this.lastName + " in DB"); 
    this.db.object('firstNames').valueChanges().subscribe(firsts=>{
        if (firsts[this.firstName] != undefined) this.firstValid = true;
        console.log(this.firstName);
        console.log(this.firstValid);
    });
    this.db.object('lastNames').valueChanges().subscribe(lasts=>{
        if (lasts[this.lastName] != undefined) this.lastValid = true;
        console.log(this.lastName);
        console.log(this.lastValid);
    });
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {
    console.log("init");
  }

}
