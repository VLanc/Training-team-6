import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { VacanciesComponent } from '../vacancies/vacancies.component';
import { InterviewComponent } from '../interview/interview.component';

const appRoutes: Routes = [
  { path: 'interview', component: InterviewComponent },
  /*  { path: '',
      redirectTo: '/interview',
      pathMatch: 'full'
    },*/
  { path: 'vacancies', component: VacanciesComponent },
  // { path: 'candidates', component: candidates },
  // { path: 'management', component: management },
  // { path: '**', component: PageNotFoundComponent },
  { path: '',
    redirectTo: '/vacancies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
