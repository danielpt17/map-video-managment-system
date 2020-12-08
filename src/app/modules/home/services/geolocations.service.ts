import {Injectable} from '@angular/core';
import {OpenStreetMapProvider} from 'leaflet-geosearch';

@Injectable()
export class GeoLocationsService {

  provider = new OpenStreetMapProvider();

  getLongAndLatByAddress(address: string): Promise<any[]> {
    return this.provider.search({query: address});
  }

}
