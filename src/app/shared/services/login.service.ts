import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../entities/user.entity';
import {ApiUrlService} from './api-url.service';

@Injectable()
export class LoginService {

  // private addressUrl = 'http://10.0.0.18:3000/users';
  // private addressUrl = 'http://192.168.1.39:3000/users';
  private addition = 'users';
  // private addressUrl = 'https://access-book.firebaseio.com/users';

  constructor(
    private api: ApiUrlService
  ) {}

  getUserByEmail(email: string): Observable<User[]> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    return this.api.get(this.addition + `?email=${email}`);
  }
}
