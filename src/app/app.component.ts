import {Component, HostListener, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {routerTransition} from "./animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'rentparking';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    console.log(event.target.scrollTop >= 500);
    this.isSticky = event.target.scrollTop >= 500;
  }
  opened!: boolean;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  clickHandler() {
    this.sidenav.close();
  }
}
