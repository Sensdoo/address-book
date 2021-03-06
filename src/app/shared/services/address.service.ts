import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Address } from '../../entities/address.entity';
import { Entrance } from '../../entities/entrance.entity';
import {ApiUrlService} from './api-url.service';

@Injectable()
export class AddressService {

  // private addressUrl = 'http://10.0.0.18:3000/addresses';
  // private addressUrl = 'http://192.168.1.39:3000/addresses/';
  private addition = 'addresses/';
  // private addressUrl = 'https://access-book.firebaseio.com/addresses/';

  constructor(private api: ApiUrlService) {}

  getAddressId(streetId: string, house: string, building: string): Observable<Address[]> {
    const params = new HttpParams()
      .append('streetId', streetId)
      .append('house', house)
      .append('building', building);
    return this.api.get(this.addition, params);
  }

  getAddressAndAllHisEntrances(id: number): Observable<Entrance[]> {
    return this.api.get( this.addition + id + '/entrances');
  }

  getAddressById(id: number): Observable<Address> {
    return this.api.get(this.addition + id);
  }

  getAddressByStreetId(streetId: string): Observable<Address> {
    const params = new HttpParams()
      .append('streetId', streetId);
    return this.api.get(this.addition, params);
  }

}
