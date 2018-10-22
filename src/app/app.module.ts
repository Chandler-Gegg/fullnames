import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';

import { LoginService } from './login/login.service';
import { AppRoutingModule } from './app-routing.module';

import {AuthGuard} from './login/auth.guard';
import {DashboardService} from "./dashboard/dashboard.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    DashboardService],

  bootstrap: [AppComponent]
})
export class AppModule { }
