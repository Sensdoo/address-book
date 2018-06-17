import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';


import { AppComponent } from './app.component';
import { SystemModule } from './system/system.module';
import { AppRoutingModule } from './app-routing.module';
import { StreetService } from './shared/services/street.service';
import { AddressService } from './shared/services/address.service';
import {AuthModule} from './auth/auth.module';
import {LoginService} from './shared/services/login.service';
import {AuthService} from './shared/services/auth.service';
import {EntranceService} from './shared/services/entrance.service';
import {AppGuard} from './shared/services/app-guard.service';
import {ApiUrlService} from './shared/services/api-url.service';
import {EntranceStorageService} from './shared/services/entrance-storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    SystemModule,
    AuthModule
  ],
  providers: [
    StreetService,
    AddressService,
    LoginService,
    AuthService,
    EntranceService,
    AppGuard,
    ApiUrlService,
    EntranceStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
