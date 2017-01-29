import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
   constructor(private http: Http) {}

   public get(uri: string): Observable<any> {
      return this.http.get(uri)
         .map((response) => response.json());
   }

   public post(uri: string, body: any): Observable<any> {
      let bodyAsString = JSON.stringify(body);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers });
      return this.http.post(uri, bodyAsString, options)
         .map((response) => response.json());
   }
}
