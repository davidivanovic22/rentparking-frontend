import {Component, HostListener, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rentparking';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.isSticky = window.pageYOffset >= 250;
  }
  opened!: boolean;

  constructor() { }

  ngOnInit() {
  }

  clickHandler() {
    this.sidenav.close();
  }
}
