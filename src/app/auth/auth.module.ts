import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';

import {AuthComponent} from './auth.component';

import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ResetComponent} from './reset/reset.component';

import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ResetComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {
}
