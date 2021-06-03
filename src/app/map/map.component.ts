import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Marker} from "mapbox-gl";
import {Map} from "mapbox-gl";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor(private ngZone: NgZone) {
  }

  map!: Map;
  marker!: Marker;
  geocoder!: MapboxGeocoder;

  ngOnInit() {
    mapboxgl!.accessToken = 'pk.eyJ1IjoiZGF2aWRpdmFub3ZpYzIyIiwiYSI6ImNrcGZpZGNtbjI3dXUydm5seGh5ajV4aXYifQ.4Q1c-djtUvRf_Bwro4t6hg';
    console.log(mapboxgl)
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-2.81361, 36.77271], // starting position [lng, lat]
      zoom: 13 // starting zoom
    });
    // this.map.on('load',  () => {
    //   let layers = this.map.getStyle().layers;
    //   var labelLayerId;
    //   for (var i = 0; i < layers!.length; i++) {
    //     // @ts-ignore
    //     if (layers![i].type === 'symbol' && layers[i]['layout']['text-field']) {
    //       labelLayerId = layers![i].id;
    //       break;
    //     }
    //   }
    //   this.map.addLayer(
    //     {
    //       'id': 'add-3d-buildings',
    //       'source': 'composite',
    //       'source-layer': 'building',
    //       'filter': ['==', 'extrude', 'true'],
    //       'type': 'fill-extrusion',
    //       'minzoom': 15,
    //       'paint': {
    //         'fill-extrusion-color': '#aaa',
    //         'fill-extrusion-height': [
    //           'interpolate',
    //           ['linear'],
    //           ['zoom'],
    //           15,
    //           0,
    //           15.05,
    //           ['get', 'height']
    //         ],
    //         'fill-extrusion-base': [
    //           'interpolate',
    //           ['linear'],
    //           ['zoom'],
    //           15,
    //           0,
    //           15.05,
    //           ['get', 'min_height']
    //         ],
    //         'fill-extrusion-opacity': 0.6
    //       }
    //     },
    //
    //     labelLayerId
    //   );
    // });


    this.marker = new mapboxgl.Marker({color: 'green'});
    this.marker.setLngLat([this.map.getCenter().lng, this.map.getCenter().lat]).addTo( this.map);
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl:  this.map,
      marker: false,
      getItemValue: ({center, place_name}) => {
        this.marker.remove();
        this.marker.setLngLat([center[0], center[1]]).addTo( this.map);
        return place_name;
      }
    })
    this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right")
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }), "bottom-right")
    this.map.addControl(new mapboxgl.FullscreenControl(), "top-right")
    this.map.addControl(new mapboxgl.AttributionControl(), "top-right")
    this.map.addControl(this.geocoder, "top-left");

    console.log(mapboxgl)
  }

  ngAfterViewInit(): void {
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }


}
