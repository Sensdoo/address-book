import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Street } from '../../entities/street.entity';

@Injectable()
export class StreetService {

  // private streetUrl = 'http://10.0.0.18:3000/streets';
  // private streetUrl = 'http://192.168.1.39:3000/streets';
  private streetUrl = 'http://93.95.97.110:3000/streets';
  // private streetUrl = 'http://192.168.1.39:3000/streets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Street[]> {
    return this.http.get<Street[]>(this.streetUrl);
  }
}
