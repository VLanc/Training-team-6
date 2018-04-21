import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing/app-routing.module';

import {AuthModule} from './auth/auth.module';
import {SystemModule} from './system/system.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {UsersServices} from "./shared/services/users.services";
import {HttpClientModule, HttpClient } from "@angular/common/http";
import {AuthServeces} from "./shared/services/auth.serveces";
import {AuthGuard} from "./shared/services/auth.guard";


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
  providers: [UsersServices,
    HttpClientModule,
    AuthServeces,
    AuthGuard
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}
