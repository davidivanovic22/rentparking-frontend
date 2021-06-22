import {Component, DoCheck, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService} from "../assets/services/auth/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'rentparking';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSticky: boolean = false;
  isLoggedIn!: boolean;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.isSticky = window.pageYOffset >= 250;
  }

  opened!: boolean;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  clickHandler() {
    this.sidenav.close();
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.authService.logOut();
  }
}
