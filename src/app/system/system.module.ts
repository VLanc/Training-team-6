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
import {IdCandidateComponent } from './id-candidate/id-candidate.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {FormsModule} from '@angular/forms';
import {
  DxButtonModule, DxDataGridModule, DxTemplateModule, DxSelectBoxModule,
  DxAutocompleteModule
} from 'devextreme-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import {InterviewService} from './shared/services/interview.service';
import {VacanciesService} from './shared/services/vacancies.service';
import { CandidatesComponent} from './candidates/candidates.component';
import {CandidatesService} from './shared/services/candidates.service';
import {PositionService} from './shared/services/position.service';
import { ExperienceComponent } from './id-candidate/experience/experience.component';
import { SkillComponent } from './id-candidate/skill/skill.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    MenuComponent,
    UpBarComponent,
    SystemComponent,
    VacanciesComponent,
    InterviewComponent,
    IdCandidateComponent,
    UserCabinetComponent,
    CandidatesComponent,
    ExperienceComponent,
    SkillComponent,
    NotificationsComponent
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
    OwlNativeDateTimeModule,
    DxButtonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxAutocompleteModule,
    DxSelectBoxModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    InterviewService,
    VacanciesService,
    CandidatesService,
    PositionService
  ],
  bootstrap: [SystemComponent]

})
export class SystemModule {
}
