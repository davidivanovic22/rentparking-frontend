import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {MatDialogRef} from "@angular/material/dialog";
import { HomeComponent } from './home/home.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import {MaterialModule} from "./material.module";
import { MapComponent } from './map/map.component';
import { InformationDialogComponent } from './map/information-dialog/information-dialog.component';
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {NgxMatMomentModule} from "@angular-material-components/moment-adapter";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    MapComponent,
    InformationDialogComponent
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
    {provide: MAT_DATE_LOCALE, useValue: "sr"},
    {provide: MatDialogRef, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
