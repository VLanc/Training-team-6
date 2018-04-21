import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';

import {VacanciesComponent} from './vacancies/vacancies.component';
import {InterviewComponent} from './interview/interview.component';
import {AuthGuard} from "../shared/services/auth.guard";


const appRoutes: Routes = [
  {
    path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: 'system', component: SystemComponent},
      {path: 'interview', component: InterviewComponent},
      {path: 'vacancies', component: VacanciesComponent}
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
