import {NgModule} from '@angular/core';
// import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {VacanciesComponent} from '../vacancies/vacancies.component';
import {InterviewComponent} from '../interview/interview.component';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'interview', component: InterviewComponent},
  {path: 'vacancies', component: VacanciesComponent},
  // { path: 'management', component: management },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'},


];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    // CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
