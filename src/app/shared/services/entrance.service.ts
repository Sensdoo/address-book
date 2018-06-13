import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Entrance} from '../../entities/entrance.entity';

@Injectable()
export class EntranceService {

  // private addressUrl = 'http://10.0.0.18:3000/entrances';
  // private addressUrl = 'http://192.168.1.39:3000/entrances';
  private addressUrl = 'http://93.95.97.110:3000/entrances';
  // private addressUrl = 'https://access-book.firebaseio.com/entrances';

  constructor(
    private http: HttpClient
  ) {}

  getEntrance(number: number, addressId: number): Observable<Entrance[]> {
    return this.http.get<Entrance[]>(this.addressUrl, {
      params: new HttpParams().append('entranceNumber', number.toString()).append('addressId', addressId.toString())
    });
  }

  addEntrance(entrance: Entrance): Observable<Entrance> {
    console.log(entrance);
    return this.http.post<Entrance>(this.addressUrl, entrance);
  }
}
