import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../entities/user.entity';

@Injectable()
export class LoginService {

  // private addressUrl = 'http://10.0.0.18:3000/users';
  // private addressUrl = 'http://192.168.1.39:3000/users';
  private addressUrl = 'http://93.95.97.110:3000/users';
  // private addressUrl = 'https://access-book.firebaseio.com/users';

  constructor(
    private http: HttpClient
  ) {}

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(this.addressUrl + `?email=${email}`, {
      headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
    });
  }
}
