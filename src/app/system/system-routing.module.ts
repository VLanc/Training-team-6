import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';

import {VacanciesComponent} from './vacancies/vacancies.component';
import {InterviewComponent} from './interview/interview.component';


const appRoutes: Routes = [
  {
    path: '', component: SystemComponent, children: [
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
