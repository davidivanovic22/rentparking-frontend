import {Component, OnInit} from '@angular/core';
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as mapboxgl from "mapbox-gl";
import {FormControl, FormGroup} from "@angular/forms";
import {SocialAuthService} from "angularx-social-login";
import {AuthenticationService} from "../../assets/services/auth/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  geocoder!: any;
  placeName!: string;
  coordinates: number[] = [];
  form = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null)
  });

  constructor() {
  }

  ngOnInit(): void {
    mapboxgl!.accessToken = 'pk.eyJ1IjoiZGF2aWRpdmFub3ZpYzIyIiwiYSI6ImNrcGZpZGNtbjI3dXUydm5seGh5ajV4aXYifQ.4Q1c-djtUvRf_Bwro4t6hg';
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      language: 'sr-Latn',
      getItemValue: ({center, place_name}) => {
        console.log(place_name);
        console.log(center);
        this.placeName = place_name;
        this.coordinates = center;
        return place_name;
      }
    });

    this.geocoder.addTo('#geocoder1');
  }

  searchParkingPlace() {

  }
}
