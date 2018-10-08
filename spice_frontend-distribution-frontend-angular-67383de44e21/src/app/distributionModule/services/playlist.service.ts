import { Injectable } from '@angular/core';
import { SearchItems } from '../../models/loginModel';
import { Countries } from '../models/playlistModel'
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';


import { GlobalService } from '../../config/global.service';

@Injectable()
export class PlaylistService {
  private baseUrl = '';
  private headers: any;
  constructor(private http: Http, private globalService: GlobalService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.baseUrl = globalService.apiBaseAddress;
    console.log(this.baseUrl);
  }

  getAllCountries(): Observable<Countries[]> {
    return this.http.get(`${this.baseUrl}/getAllCountryName`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getplayListType(): Observable<Response> {
    return this.http.get(`${this.baseUrl}/getplayListType`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSearchItem(searchItems: SearchItems): Observable<Response> {
    const url = `${this.baseUrl}/searchPlayList`;
    return this.http.post(`${url}`, JSON.stringify(searchItems), { headers: this.headers }).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'))
  }

  getPlayListinfo(service, id): Observable<Response> {
    return this.http.get(`${this.baseUrl}/getPlayListinfo/${service}/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  insertPlayList(result,service): Observable<Response> {
    const url =`${this.baseUrl}/insertPlayList/${service}`;
    return this.http.post(`${url}`, JSON.stringify(result), { headers: this.headers })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }  

  updatePlayList(service,poditionData): Observable<Response> {
    const url = `${this.baseUrl}/updatePlayList/${service}`;
    return this.http.post(`${url}`, JSON.stringify(poditionData), { headers: this.headers }).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'))
  }

  //constructor() { }

}
