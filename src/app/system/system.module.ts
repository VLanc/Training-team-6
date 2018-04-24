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
import {SharedModule} from '../shared/shared.module';
import {IdCandidateComponent} from './id-candidate/id-candidate.component';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';

@NgModule({
  declarations: [
    MenuComponent,
    UpBarComponent,
    SystemComponent,
    VacanciesComponent,
    InterviewComponent,
    IdCandidateComponent,
    UserCabinetComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    SharedModule

  ],
  providers: [],
  bootstrap: [SystemComponent]

})
export class SystemModule {
}
