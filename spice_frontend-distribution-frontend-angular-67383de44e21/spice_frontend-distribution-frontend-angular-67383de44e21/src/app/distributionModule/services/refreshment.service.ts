import { Injectable } from '@angular/core';
import { SearchItems } from '../../models/loginModel';
//import { Countries } from '../models/playlistModel'
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../../config/global.service';

@Injectable()
export class RefreshmentService {

  private baseUrl = '';
  private headers: any;
  constructor(private http: Http, private globalService: GlobalService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.baseUrl = globalService.apiBaseAddress;
    console.log(this.baseUrl);
  }
  //constructor() { }

  getItemList(service, itemDetail): Observable<Response> {
    const url = `${this.baseUrl}/getItemList/${service}`;    
       return this.http.post(`${url}`, JSON.stringify(itemDetail), { headers: this.headers }).
       map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchItem(service,search): Observable<Response> {
    const url = `${this.baseUrl}/searchItem/${service}`;
    return this.http.post(`${url}`, JSON.stringify(search), { headers: this.headers }).
      map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addNewItem(service, newItem): Observable<Response> {
    const url = `${this.baseUrl}/addItem/${service}`;
    return this.http.post(`${url}`, JSON.stringify(newItem), { headers: this.headers }).    
      map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteItem(service, delItem): Observable<Response> {
    const url = `${this.baseUrl}/deleteItem/${service}`;
    return this.http.post(`${url}`, JSON.stringify(delItem), { headers: this.headers }).    
      map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  saveItemPosition(service, updatedItem): Observable<Response> {
    const url = `${this.baseUrl}/reorderList/${service}`;
    return this.http.post(`${url}`, JSON.stringify(updatedItem), { headers: this.headers }).
      map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
