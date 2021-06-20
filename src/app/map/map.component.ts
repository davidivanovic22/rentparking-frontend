import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Marker} from "mapbox-gl";
import {Map} from "mapbox-gl";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {InformationDialogComponent} from "./information-dialog/information-dialog.component";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  geojson = {
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
  };

  constructor(private ngZone: NgZone, private dialog: MatDialog) {
  }

  map!: Map;
  marker!: Marker;
  markers: Marker[] = [];
  geocoder!: MapboxGeocoder;
  opened = true; // Da li je 'side-nav' otvoren
  isClosed = true; // Da li je text stavki 'side-nav' menu prikazan
  blockUpdate = false; // Pomocna promenljiva koja resava bug koji ima 'side-nav'
  modeValue: string = "side";

  ngOnInit() {
    this.initMap();
    this.getMarkerPlace();
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
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: this.map,
      marker: false,
      zoom: 15,
      getItemValue: ({center, place_name}) => {
        this.remove();
        this.markers.push(this.createMarker().setLngLat([center[0], center[1]]).setPopup(
          new mapboxgl.Popup({offset: 25}) // add popups
            .setText(place_name)
        ).addTo(this.map));
        this.markerEvent(center);
        return place_name;
      }
    });
    this.map.addControl(new mapboxgl.NavigationControl(), "top-right")
    document.getElementById('geocoder')!.appendChild(this.geocoder.onAdd(this.map));
    console.log(mapboxgl)
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
    this.geojson.features.forEach((marker) => {
      this.markers.push(this.createMarker()
        .setLngLat([marker.geometry.coordinates[0], marker.geometry.coordinates[1]])
        .setPopup(
          new mapboxgl.Popup({offset: 25}) // add popups
            .setText(
              marker.properties.title + "\n\n" +
              marker.properties.description
            )
        )
        .addTo(this.map));
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
