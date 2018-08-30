import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MainService {

  constructor(private http: HttpClient) {
    console.log("debug MainService::constructor");
  }

  getData(lat: number, lng: number): any {
    let urlQuery = `//api.foursquare.com/v2/venues/explore?ll=${lat},${lng}&section=food&venuePhotos=${AppConfig.settings.venuePhotos}&oauth_token=${AppConfig.settings.oauth_token}`;

    return this.http.get<any>(urlQuery).toPromise();
  }
}
