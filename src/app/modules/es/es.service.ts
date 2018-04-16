import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EsPhoto } from './es-photo';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class EsService {

  constructor(private http: HttpClient ) { }

  /**
   * [get description]
   * @return [description]
   */
  get(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');

  }
}
