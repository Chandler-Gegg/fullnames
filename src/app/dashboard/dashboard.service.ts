import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
/*Login, routing, and search name work as intended for the most part.  Confirmation
of a valid name is only logged to console rather than rendered on screen.  I probably
should have returned an Observable from a dashboardService but I ran out of time
to re-write things. */
@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNamesRef: any;
  firstExistRef: any;
  lastNamesRef: any;

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNamesRef = this.db.list('names/first-names/');
    this.lastNamesRef = this.db.list('names/last-names/');
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getfirstNamesRef() {
    return this.firstNamesRef.valueChanges();
  }

  /*Function used when the search button from the dashboard is clicked.
  It refers to the database and checks if the user inputed name is valid.
  Only prints result TO CONSOLE.  I am struggling to conceptulize how to get
  data from an observable within a service to a component.html (such as dashboard.html here)*/
  isValidName(userInputFirst: string, userInputLast: string){
    console.log(userInputFirst + ' ' + userInputLast);
    this.db.object('names/first-names/' + userInputFirst)
      .snapshotChanges().subscribe((action) => {
        console.log(action.payload.val());
        if(action.payload.val() === true){
          this.db.object('names/last-names/' + userInputLast)
          .snapshotChanges().subscribe((second) => {
            console.log('here');
            if(second.payload.val() === true){
              console.log('Name is valid!');
              //do not have to add name to database
            }
            else{
              console.log('Last name is not valid!');
            }
          })
        }
        else{
          console.log('First name is not valid!')
        }
      })
  }

  /*Function does not save data to database.  I've looked at AngularFireDatabase
  documents for a few hours and have tried numerous methods to get this to work
  with no success.  My thought was to grab the input from the dashboard and then
  push it to the the database if the name is not already present.*/
  addNametoDB(userInputFirst: string, userInputLast: string){
    console.log(userInputFirst + ' ' + userInputLast);
    this.firstNamesRef.push().set({userInputFirst: true});
    this.lastNamesRef.push().set({userInputLast: true});
  }


}
