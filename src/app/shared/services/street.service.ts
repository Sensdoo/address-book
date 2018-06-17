import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Street } from '../../entities/street.entity';
import {ApiUrlService} from './api-url.service';

@Injectable()
export class StreetService {

  // private streetUrl = 'http://10.0.0.18:3000/streets';
  // private streetUrl = 'http://192.168.1.39:3000/streets';
  private addition = 'streets/';
  // private streetUrl = 'http://192.168.1.39:3000/streets';

  constructor(private api: ApiUrlService) {}

  getAll(): Observable<Street[]> {
    return this.api.get(this.addition);
  }

  getStreetById(id: number): Observable<Street> {
    return this.api.get(this.addition + id);
  }
}
