import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {SystemRoutingModule} from './system-routing.module';

import {SystemComponent} from './system.component';

import {MenuComponent} from './menu/menu.component';
import {UpBarComponent} from './up-bar/up-bar.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {InterviewComponent} from './interview/interview.component';
import {FullCalendarModule} from 'ng-fullcalendar';
import {AuthServeces} from '../shared/services/auth.serveces';
import {SharedModule} from '../shared/shared.module';
import { IdCandidateComponent } from './id-candidate/id-candidate.component';
import { InterviewModalComponent } from './interview-modal/interview-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    MenuComponent,
    UpBarComponent,
    SystemComponent,
    VacanciesComponent,
    InterviewComponent,
    IdCandidateComponent,
    InterviewModalComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    SharedModule,
    FormsModule,
    NgbModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [],
  bootstrap: [SystemComponent]

})
export class SystemModule {
}
