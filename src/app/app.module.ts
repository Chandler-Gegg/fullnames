import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';

import { firebaseConfig } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login/login.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardService } from './dashboard/dashboard.service';
import { AlertService } from './alert/alert.service';
import { AuthGuard } from './login/auth.guard';
import { AlertComponent } from './alert/alert.component';
import { HistoryService } from './history/history.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HistoryComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [LoginService,
    AuthGuard,
    DashboardService,
    AlertService,
    HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
