import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import {switchMap} from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from '@angular/fire/database';
// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';

function debugLog(marker, value) {
  console.log(marker);
  console.log(value);
  console.log(marker);
}

@Injectable()
export class LoginService {
  authState: Observable<{} | null>;

  user: Observable<{} | null>;
  userUid: string;
  sessionKey: string;

  /*
  The constructor fetches the user
   */
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {

    this.user = this.afAuth.authState
    .switchMap((user) => {
      if (user) {
        this.userUid = user.uid;
        debugLog('SWITCHMAP', user);
        return this.db.object(`users/${user.uid}`)
          .update({email: user.email})
          .then(() => {
              return this.db.object(`users/${user.uid}`).valueChanges();
            })
          .catch( (error) => {
          debugLog('ERROR UPDATING USER EMAIL', error);
        });
      } else {
        return Observable.of(null);
      }
    });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log('auth.user.uid', auth.user.uid);
        const createdAt = firebase.database.ServerValue.TIMESTAMP;
        debugLog('loginWithEmail CREATED AT', createdAt);
        this.sessionKey = this.db.database
                        .ref(`sessions`)
                        .push({
                          userUid: auth.user.uid
                        }).key;

        const sessionPayload: any = {
          createdAt: createdAt,
          userUid: auth.user.uid,
          currentSessionKey: this.sessionKey,
        };

        const sessionPayloads: any = {};
        sessionPayloads[`currentSession/${auth.user.uid}`] = sessionPayload;
        sessionPayloads[`users/${auth.user.uid}/sessions/${this.sessionKey}`] = {'createdAt': createdAt};
        debugLog('sessionPayloads', sessionPayloads )
        return this.db.database.ref().update(sessionPayloads);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
