import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class GeocoderService {

  constructor(private http: HttpClient) { }

  decode(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;
    const latlng = lat.toString() + ',' + lng.toString();
    const params = new HttpParams()
      .set('key', environment.GOOGLE_MAPS_API_KEY)
      .set('latlng', latlng)
      .set('sensor', 'false');

    return new Promise((resolve, reject) => {
      this.http.get(url, { params: params }).subscribe((result) => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  encode(query: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;
    const params = new HttpParams()
      .set('key', environment.GOOGLE_MAPS_API_KEY)
      .set('address', query)
      .set('sensor', 'false');

      return new Promise((resolve, reject) => {
        this.http.get(url, { params: params }).subscribe((result) => {
          resolve(result);
        }, (err) => {
          reject(err);
        });
      });
  }
}
