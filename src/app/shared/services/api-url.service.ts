import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiUrlService {

  private url = 'http://192.168.1.39:3000/';
  // private url = 'http://93.95.97.110:3000';
  // private url = 'http://10.0.0.18:3000';

  constructor(private http: HttpClient) {}

  get(addition: string, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    return this.http.get<any>(this.url + addition, {
      headers: headers,
      params: params
    });
  }

  post(addition: string, data: any = {}, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    return this.http.post<any>(this.url + addition, data, {
      headers: headers,
      params: params
    });
  }

  put(addition: string, data: any = {}, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    return this.http.put<any>(this.url + addition, data, {
      headers: headers,
      params: params
    });
  }

  delete(addition: string, id: number, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    return this.http.delete(this.url + addition + id, {
      headers: headers,
      params: params
    });
  }
}
