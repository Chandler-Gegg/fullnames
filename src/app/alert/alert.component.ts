import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService } from './alert.service';
import { Alert } from '../models/alert';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];
  classes = [];
  constructor(private alertService: AlertService, private ref: ChangeDetectorRef) { }

  ngOnInit() {

    this.alertService.alert$.subscribe((alert: Alert) => {
      if (!alert) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
      }

      // add alert to array
      this.alerts = [alert];
      this.classes = ['alert', `alert-${alert.level}`];
  });
  }

  removeAlert() {
    this.alertService.reset();
  }
}
