import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FirstPageComponent} from "./first-page/first-page.component";
import {SecondPageComponent} from "./second-page/second-page.component";
import {ThirdPageComponent} from "./third-page/third-page.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  // {
  //   path: 'about',
  //   component: FirstPageComponent
  // },
  // {
  //   path: 'login',
  //   component: SecondPageComponent
  // },
  // {
  //   path: 'contact',
  //   component: ThirdPageComponent
  // },
  // {
  //   path: "",
  //   redirectTo: "home",
  //   pathMatch: "full"
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
