import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing/app-routing.module';

import {AuthModule} from './auth/auth.module';

import {MenuComponent} from './menu/menu.component';
import {UpBarComponent} from './up-bar/up-bar.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {InterviewComponent} from './interview/interview.component';


import {FullCalendarModule} from 'ng-fullcalendar';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {UsersServices} from "./shared/services/users.services";
import {HttpClientModule, HttpClient } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UpBarComponent,
    VacanciesComponent,
    InterviewComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule
  ],

  /*main logic END*/
  providers: [UsersServices, HttpClientModule],
  bootstrap: [AppComponent]

})
export class AppModule {
}
