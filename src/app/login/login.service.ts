import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
// import {switchMap} from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {AngularFireDatabase} from '@angular/fire/database';

// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
  authState: Observable<{} | null>;

  user: Observable<{} | null>;
  userUid: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {

    this.user = this.angularFireAuth.authState
      .switchMap((user) => {
        if (user) {
          this.userUid = user.uid;
          console.log('SWITCHMAP');
          console.log(user);
          console.log('SWITCHMAP');
          return this.db.object(`users/${user.uid}`)
            .update({email: user.email})
            .then(() => {
              return this.db.object(`users/${user.uid}`).valueChanges();

            }).catch((error) => {
              console.log('ERROR UPDATING USER EMAIL');
              console.log(error);
              console.log('ERROR UPDATING USER EMAIL');
            });
        } else {
          return Observable.of(null);
        }
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password) //angular fire always returns promises
      .then((auth) => {
        console.log(auth.user.uid);
        const createdAt = firebase.database.ServerValue.TIMESTAMP;
        console.log('CREATED AT');
        console.log(createdAt);
        console.log('CREATED AT');

        const sessionKey = this.db.database
          .ref(`sessions`)
          .push({
            userUid: auth.user.uid
          }).key;

        const sessionPayload: any = {
          createdAt: createdAt,
          userUid: auth.user.uid,
          currentSessionKey: sessionKey,
        };

        const sessionPayloads: any = {};
        sessionPayloads[`currentSession/${auth.user.uid}`] = sessionPayload;
        sessionPayloads[`users/${auth.user.uid}/sessions/${sessionKey}`] = {'createdAt': createdAt};

        return this.db.database.ref()
          .update(sessionPayloads);
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  signOut() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
