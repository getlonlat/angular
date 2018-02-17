import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationService {

  constructor() { }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve(position);
        }, function (err) {
          reject(err);
        }
      );
    });
  }
}
