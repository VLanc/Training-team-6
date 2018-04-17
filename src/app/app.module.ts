


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { MenuComponent } from './menu/menu.component';
import { UpBarComponent } from './up-bar/up-bar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

/*main logic*/
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // { path: 'interview', component: interview },
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
  declarations: [
    AppComponent,
    MenuComponent,
    VacanciesComponent,
    UpBarComponent
  ],
  imports: [
    BrowserModule, /*чтобы что-то показывал*/
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AppRoutingModule,
    BrowserAnimationsModule

    // other imports here
  ],

  /*main logic END*/
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
