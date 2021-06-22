import {Component, NgZone, OnInit} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {Map, Marker} from "mapbox-gl";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {InformationDialogComponent} from "./information-dialog/information-dialog.component";
import {LocationService} from "../../assets/services/location/location.service";
// import {Booking} from "../../@types/entity/Booking";
import {BookingService} from "../../assets/services/booking/booking.service";
import {ActivatedRoute} from "@angular/router";
import {BookingDTO} from "../../@types/entity/dto/BookingDTO";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  /*geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-77.032, 38.913]
        },
        'properties': {
          'title': 'Mapbox',
          'description': 'Washington, D.C.'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-122.414, 30.776]
        },
        'properties': {
          'title': 'Mapbox',
          'description': 'San Francisco, California'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-120.414, 37.776]
        },
        'properties': {
          'title': 'Mapbox',
          'description': 'San Francisco, California'
        }
      }
    ]
  };*/

  geojson: BookingDTO[] = [];

  constructor(private ngZone: NgZone, private dialog: MatDialog,
              private locationService: LocationService,
              private bookingService: BookingService,
              private route: ActivatedRoute) {
  }

  map!: Map;
  marker!: Marker;
  markers: Marker[] = [];
  geocoder!: MapboxGeocoder;
  opened = true; // Da li je 'side-nav' otvoren
  isClosed = true; // Da li je text stavki 'side-nav' menu prikazan
  blockUpdate = false; // Pomocna promenljiva koja resava bug koji ima 'side-nav'
  modeValue: string = "side";
  start: any;
  end: any;
  placeName!: string;
  latitude!: any;
  longitude!: any;

  ngOnInit() {
    this.start = this.route.snapshot.paramMap.get("start");
    this.end = this.route.snapshot.paramMap.get("end");
    this.placeName = this.route.snapshot.paramMap.get("placeName")!;
    this.latitude = this.route.snapshot.paramMap.get("latitude");
    this.longitude = this.route.snapshot.paramMap.get("longitude");
    console.log(this.placeName.split(",")[0])
    this.getAllBookingByCity(this.placeName.split(",")[0]);
    this.initMap();
    window.dispatchEvent(new Event("resize"));
    this.toggleText(true);
  }

  initMap() {
    mapboxgl!.accessToken = 'pk.eyJ1IjoiZGF2aWRpdmFub3ZpYzIyIiwiYSI6ImNrcGZpZGNtbjI3dXUydm5seGh5ajV4aXYifQ.4Q1c-djtUvRf_Bwro4t6hg';
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [21.70472, 43.53833], // starting position [lng, lat]
      zoom: 13 // starting zoom
    });


    /*
* settlement-label
*
* */


    this.map.on("click", (data) => {
      this.map.queryRenderedFeatures().map(loc => {
       /* console.log(data.lngLat.lng)

        let location: any = {};
        if (loc) {
          location.name = loc.properties!.name;
          location.address = loc.properties!.name;
        }
        location.city = "Leskovac";
        // @ts-ignore
        location.longitude = loc.geometry.coordinates[0][0];
        // @ts-ignore
        location.latitude = loc.geometry.coordinates[0][1];
        if (location.name) {
          console.log(location)
          this.locationService.save(location).subscribe(loc => {

          });
        }*/
      });

    });
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: this.map,
      marker: false,
      language: 'sr-Latn',
      zoom: 15,
      getItemValue: ({center, place_name}) => {
        this.remove();
         /* this.markers.push(this.createMarker().setLngLat([center[0], center[1]]).setPopup(
            new mapboxgl.Popup({offset: 25}) // add popups
              .setText(place_name)
          ).addTo(this.map));*/
          this.markerEvent(center);
        this.getAllBookingByCity(place_name.split(",")[0]);
        return place_name;
      }
    });
    this.map.addControl(new mapboxgl.NavigationControl(), "top-right")
    document.getElementById('geocoder')!.appendChild(this.geocoder.onAdd(this.map));
    console.log(mapboxgl)
  }

  getAllBookingByCity(placeName: string) {
    this.bookingService.getAllBookingDTOByCity(placeName).subscribe(data => {
      this.geojson = data;
      this.getMarkerPlace();

    });
  }

  createMarker(): Marker {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.marker = new Marker({color: "#" + randomColor});
    return this.marker;
  }

  remove() {
    this.markers.forEach(marker => {
      marker.remove();
    });
  }

  getMarkerPlace() {
    this.geojson.forEach((marker) => {
      this.markers.push(this.createMarker()
        .setLngLat([marker.parking.location.longitude, marker.parking.location.latitude])
        .setPopup(
          new mapboxgl.Popup({offset: 25}) // add popups
            .setText(
              marker.parking.name + "\n\n" +
              marker.parking.description
            )
        )
        .addTo(this.map));
      console.log(marker)
      this.markerEvent(marker);
    });
  }

  markerEvent(marker: any) {
    this.marker.getElement().addEventListener('click', () => {
      this.openDialog(marker)
    });
  }

  openDialog(geo: any) {
    console.log(geo, "Geo")
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {};
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "30%";
    this.dialog.open(InformationDialogComponent, dialogConfig);
  }


  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  toggleText(show: any) {
    if (this.modeValue === "over") {
      return;
    }
    if (show == null) {
      this.isClosed = !this.isClosed;
    } else {
      this.isClosed = !show;
    }

    this.blockUpdate = true;
    window.dispatchEvent(new Event("resize"));
  }

  toggleMenu(show: any) {
    if (show == null) {
      this.opened = !this.opened;
    } else {
      this.opened = !show;
    }
  }

  onResize(event: any) {
    if (this.blockUpdate) {
      this.blockUpdate = false;
      return;
    }
    if (event.target.innerWidth > 1280) {// 1100
      this.modeValue = "side";
      this.opened = true;
      this.isClosed = false;
    } else if (event.target.innerWidth <= 1280 && event.target.innerWidth > 480) {
      this.opened = true;
      this.modeValue = "side";
      this.isClosed = false;
    } else if (event.target.innerWidth <= 480) {
      this.opened = false;
      this.modeValue = "over";
      this.isClosed = true;
    }
  }

}
