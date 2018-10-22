import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert } from '../models/alert';

@Injectable()
export class AlertService implements OnInit {

  private _alert = new Subject<Alert>();
  public alert$ = this._alert.asObservable();
  constructor() { }

  ngOnInit() {
    this._alert.next(new Alert('success', 'yay'));
  }
  success(message) {
    this._alert.next(new Alert('success', message));
  }

  danger(message) {
    this._alert.next(new Alert('danger', message));
  }

  reset() {
    this._alert.next(null);
  }

  getAlert(): Observable<any> {
    return this._alert.asObservable();
  }
}
