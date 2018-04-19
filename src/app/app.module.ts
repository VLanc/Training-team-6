


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';
import { UpBarComponent } from './up-bar/up-bar.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { InterviewComponent } from './interview/interview.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { FullCalendarModule } from 'ng-fullcalendar';

/*main logic*/






@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    VacanciesComponent,
    UpBarComponent,
    InterviewComponent
  ],
  imports: [
    BrowserModule, /*чтобы что-то показывал*/
/*    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),*/
    AppRoutingModule,
    BrowserAnimationsModule,
    FullCalendarModule
    // other imports here
  ],

  /*main logic END*/
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
