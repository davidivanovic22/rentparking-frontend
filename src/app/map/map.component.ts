import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Marker} from "mapbox-gl";
import {Map} from "mapbox-gl";
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  stores = [{
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-77.034084142948, 38.909671288923]
        },
        'properties': {
          'phoneFormatted': '(202) 234-7336',
          'phone': '2022347336',
          'address': '1471 P St NW',
          'city': 'Washington DC',
          'country': 'United States',
          'crossStreet': 'at 15th St NW',
          'postalCode': '20005',
          'state': 'D.C.'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-77.049766, 38.900772]
        },
        'properties': {
          'phoneFormatted': '(202) 507-8357',
          'phone': '2025078357',
          'address': '2221 I St NW',
          'city': 'Washington DC',
          'country': 'United States',
          'crossStreet': 'at 22nd St NW',
          'postalCode': '20037',
          'state': 'D.C.'
        }
      }, {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-77.002583742142, 38.887041080933]
        },
        'properties': {
          'phoneFormatted': '(202) 547-9338',
          'phone': '2025479338',
          'address': '221 Pennsylvania Ave SE',
          'city': 'Washington DC',
          'country': 'United States',
          'crossStreet': 'btwn 2nd & 3rd Sts. SE',
          'postalCode': '20003',
          'state': 'D.C.'
        }
      },

      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-77.10853099823, 38.880100922392]
        },
        'properties': {
          'phoneFormatted': '(703) 522-2016',
          'phone': '7035222016',
          'address': '4075 Wilson Blvd',
          'city': 'Arlington',
          'country': 'United States',
          'crossStreet': 'at N Randolph St.',
          'postalCode': '22203',
          'state': 'VA'
        }
      },
    ]
  }];

  constructor(private ngZone: NgZone) {
  }

  map!: Map;
  marker!: Marker;
  markers: Marker[] = [];
  geocoder!: MapboxGeocoder;
  opened = true
  isClosed = true;
  blockUpdate = false;
  modeValue: string = "side";
  el: any[] = [];

  ngOnInit() {
    console.log(this.stores)
    this.initMap();
    this.getMarkerPlace();
  }

  initMap() {
    mapboxgl!.accessToken = 'pk.eyJ1IjoiZGF2aWRpdmFub3ZpYzIyIiwiYSI6ImNrcGZpZGNtbjI3dXUydm5seGh5ajV4aXYifQ.4Q1c-djtUvRf_Bwro4t6hg';
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-96, 37.8], // starting position [lng, lat]
      zoom: 3 // starting zoom
    });
    this.markers.push(this.createMarker().setLngLat([this.map.getCenter().lng, this.map.getCenter().lat]).addTo(this.map));
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
        return place_name;
      }
    });

    this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right")
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }), "bottom-right")
    this.map.addControl(new mapboxgl.FullscreenControl(), "top-right")
    this.map.addControl(new mapboxgl.AttributionControl(), "top-right")
    document.getElementById('geocoder')!.appendChild(this.geocoder.onAdd(this.map));
    console.log(mapboxgl)
  }

  createMarker(): Marker {
    return this.marker = new Marker();
  }

  remove() {
    this.markers.forEach(marker => {
     marker.remove();
    });
  }

  ngAfterViewInit(): void {
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  getMarkerPlace() {
    let geojson = {
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
            'coordinates': [-122.414, 37.776]
          },
          'properties': {
            'title': 'Mapbox',
            'description': 'San Francisco, California'
          }
        }
      ]
    };
    geojson.features.forEach((marker) => {
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
    });
    console.log(this.markers)
  }

  toggleText(show: boolean) {
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

  toggleMenu(show: boolean) {
    if (show == null) {
      this.opened = !this.opened;
    } else {
      this.opened = !show;
    }
  }


  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }
}
