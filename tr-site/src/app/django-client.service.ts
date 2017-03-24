import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DjangoClientService {

  // @todo
  private user = { token: 'ThisIsAToken' };

  constructor(private https: Http) { }

  public get(url: string, options: RequestOptions): Observable<any> {
    const _options = this._setAuthToken(options);
    return this.https.get(url, _options)
                     .map((response) => response.json())
                     .catch(this.handleError);
  }

  public post(url: string, data: Object, options: RequestOptions): Observable<any> {
    const _options = this._setAuthToken(options);
    return this.https.post(url, data, _options)
                     .map((response) => response.json())
                     .catch(this.handleError);
  }

  public put(url: string, data: Object, options: RequestOptions): Observable<any> {
    const _options = this._setAuthToken(options);
    return this.https.put(url, data, _options)
                     .map((response) => response.json())
                     .catch(this.handleError);
  }

  public delete(url: string, options: RequestOptions): Observable<any> {
    const _options = this._setAuthToken(options);
    return this.https.delete(url, _options)
                     .map((response) => response.json())
                     .catch(this.handleError);
  }

  private _setAuthToken(options: RequestOptions): RequestOptions {
    if (this.user.token) {
      let headers = options.headers;
      if (headers) {
        headers['Authorization'] = 'Token ' + this.user.token;
      } else {
        headers = new Headers({ Authorization: 'Token ' + this.user.token });
      }
      options.headers = headers;
    }
    return options;
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}