import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NgtableService {

  constructor(private httpClient: HttpClient) { }

  getHttpData(): Observable<any> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

}
