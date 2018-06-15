import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Entrance} from '../../entities/entrance.entity';
import {ApiUrlService} from './api-url.service';

@Injectable()
export class EntranceService {

  // private addressUrl = 'http://10.0.0.18:3000/entrances';
  // private addressUrl = 'http://192.168.1.39:3000/entrances';
  private addition = 'entrances';
  // private addressUrl = 'https://access-book.firebaseio.com/entrances';

  constructor(
    private api: ApiUrlService
  ) {}

  getEntrance(number: number, addressId: number): Observable<Entrance[]> {
    const params = new HttpParams()
      .append('entranceNumber', number.toString())
      .append('addressId', addressId.toString());

    return this.api.get(this.addition, params);
  }

  addEntrance(entrance: Entrance): Observable<Entrance> {
    console.log('post', entrance);
    return this.api.post(this.addition, entrance);
  }

  editEntrance(entrance: Entrance): Observable<Entrance> {
    console.log('put', entrance);
    return this.api.put(this.addition + '/' + entrance['id'], entrance);
  }

  deleteEntrance(id: number): Observable<Entrance> {
    console.log('delete', id);
    return this.api.delete(this.addition + '/', id);
  }
}
