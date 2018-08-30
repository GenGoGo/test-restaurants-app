import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    error404: '404'
  },
  endpoints: {
    data: '//api.foursquare.com/v2/venues/explore',
    media: '//irs3.4sqi.net/img/general/400x400/'
  },
  settings: {
    venuePhotos: 1,
    oauth_token: "NKRP0KY5ZDZIBMCU3TZS4BMP4ZMIQZBQPLBTCPXSIGPWFJ1L&v=20160629"
  }
};
