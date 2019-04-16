import { Component, OnInit } from '@angular/core';

import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { GeocoderService } from '../../services/geocoder/geocoder.service';
import { Geohash } from '../../services/geohash/geohash';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  zoom = 5;
  start: any = {
    lat: -8,
    lng: -55,
    zoom: 0
  };
  center: any;
  hash = '';
  query = '';
  whatIsHere = '';
  places: Array<any> = [];
  showSearch: false;

  constructor(
    private geolocation: GeolocationService,
    private geocoder: GeocoderService,
    private geohash: Geohash
  ) {
  }

  ngOnInit() {
    this.updatePosition();
  }

  updatePosition() {
    this.geolocation.getCurrentPosition().then(
      (position: any) => {
        this.zoom = 16;
        this.start = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.updateAddressGeohash();
      }, (err) => {
        alert(err.message);
      });
  }

  dropMarker() {
    this.start = this.center;
    this.updateAddressGeohash();
  }

  onDragEndMarker(evt) {
    this.start = {
      lat: evt.coords.lat,
      lng: evt.coords.lng,
    };

    this.updateAddressGeohash();
  }

  onCenterChange(evt) {
    this.center = evt;
  }

  onChangeQuery(evt) {
    this.geocoder.encode(evt).then((data: any) => {
      if (data.hasOwnProperty('results')) {
        this.places = data.results;
      }
      console.log(data.results);
    }, (err) => {
      console.error(err);
    });
  }

  selectAddress(place) {
    this.zoom = 16;
    this.start = place.geometry.location;
    this.whatIsHere = place.formatted_address;
    this.hash = this.geohash.encode(this.start.lat, this.start.lng, 12);

    this.clearSearch();
  }

  clearSearch() {
    this.query = '';
    this.places = [];
  }

  updateAddressGeohash() {
    this.hash = this.geohash.encode(this.start.lat, this.start.lng, 12);

    this.geocoder.decode(this.start.lat, this.start.lng).then(
      (data: any) => {
        if (data.status === 'OK' && data.results[0]) {
          this.whatIsHere = data.results[0].formatted_address;
        } else {
          this.whatIsHere = '';
        }
      },
      (err) => {
        this.whatIsHere = '';
      }
    );
  }
}
