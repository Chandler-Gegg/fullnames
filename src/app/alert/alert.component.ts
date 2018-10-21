import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AlertService } from './alert.service';
import { Alert } from '../models/alert';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  alerts: Alert[] = [];
  private unsubscribe$ = new Subject<void>();
  constructor(private alertService: AlertService, private ref: ChangeDetectorRef) { }

  ngOnInit() {

    this.alertService.alert$.pipe(
      takeUntil(this.unsubscribe$))
      .subscribe((alert: Alert) => {
      if (!alert) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
      }

      // add alert to array
      this.alerts.push(alert);
  });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
