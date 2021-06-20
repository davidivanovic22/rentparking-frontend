import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {MatDialogRef} from "@angular/material/dialog";
import {HomeComponent} from './home/home.component';
import {FirstPageComponent} from './first-page/first-page.component';
import {SecondPageComponent} from './second-page/second-page.component';
import {ThirdPageComponent} from './third-page/third-page.component';
import {MaterialModule} from "./material.module";
import {MapComponent} from './map/map.component';
import {InformationDialogComponent} from './map/information-dialog/information-dialog.component';
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {NgxMatMomentModule} from "@angular-material-components/moment-adapter";
import {LoginComponent} from "./login/login.component";
import {JwtInterceptor} from 'src/assets/services/auth/jwt.interceptor';
import {CookieService} from 'ngx-cookie-service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig
} from "angularx-social-login";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    MapComponent,
    InformationDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
  ],
  providers: [
    CookieService,
    SocialAuthService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'sr-Latn'},
    {provide: MAT_DATE_LOCALE, useValue: "sr"},
    {provide: MatDialogRef, useValue: {}},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("282577308941815")
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("1016994148249-cvijokf575kprvsj6899n1ms5a213uu4.apps.googleusercontent.com")
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
