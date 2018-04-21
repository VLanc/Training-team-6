import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing/app-routing.module';

import {AuthModule} from './auth/auth.module';
import {SystemModule} from './system/system.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {UsersServices} from "./shared/services/users.services";
import {HttpClientModule, HttpClient } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SystemModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  providers: [UsersServices, HttpClientModule],
  bootstrap: [AppComponent]

})
export class AppModule {
}
