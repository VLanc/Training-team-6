import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from './auth.component';

import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ResetComponent} from './reset/reset.component';


const appRoutes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'reset', component: ResetComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
