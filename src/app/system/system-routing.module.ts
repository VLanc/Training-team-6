import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';

import {IdCandidateComponent} from './id-candidate/id-candidate.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {InterviewComponent} from './interview/interview.component';
import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import {AuthGuard} from '../shared/services/auth.guard';
import {CandidatesComponent} from './candidates/candidates.component';



const appRoutes: Routes = [
  {
    path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: 'id-candidate/:id', component: IdCandidateComponent},
      {path: 'interview', component: InterviewComponent},
      {path: 'vacancies', component: VacanciesComponent},
      {path: 'user-cabinet', component: UserCabinetComponent},
      {path: 'candidates', component: CandidatesComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
