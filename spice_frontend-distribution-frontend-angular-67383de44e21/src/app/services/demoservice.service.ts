import { Injectable } from '@angular/core';
import { GlobalService } from '../config/global.service';
import { Http, Headers, Response } from '@angular/http';
import { Login, AllService, ContainerItems, SearchItems, CreateItem } from '../models/loginModel';
import { RefreshmentModel } from '../models/loginModel';
import { Countries } from '../distributionModule/models/refreshmentModel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';




@Injectable()
export class DemoserviceService {
  private baseUrl = '';
  private header: Headers;

  constructor(private http: Http, private globalConfig: GlobalService) {
    this.baseUrl = globalConfig.apiBaseAddress;
    this.header = new Headers({ 'content-type': 'application/json' });
  }

  login(user: Login): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, JSON.stringify(user), { headers: this.header }).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'))
  }

  getAllService(): Observable<Response> {
    var url = `${this.baseUrl}/getServices/`;
    return this.http.get(url).
      map((res: Response) =>
        res.json()
      ).
      catch((error: any) => {
        return Observable.throw(error.json().error || 'Server Error')
      }
      )
  }



  getSections(serviceName,countryId): Observable<Response> {
    const url = `${this.baseUrl}/getSection/${serviceName}/${countryId}`;
    return this.http.get(url).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'))
  }

  getContainerItems(serviceName, containerId): Observable<RefreshmentModel[]> {
    const url = `${this.baseUrl}/getContainerItems/${serviceName}/${containerId}`;
    return this.http.get(url).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'))
  }

  getSearchItem(searchItems: SearchItems): Observable<Response> {
    const url = `${this.baseUrl}/Search`;
    return this.http.post(`${url}`, JSON.stringify(searchItems), { headers: this.header }).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'))
  }

  addNewItem(result): Observable<Response> {
    const url = `${this.baseUrl}/addNewItems`;
    return this.http.post(`${url}`, JSON.stringify(result[0]), { headers: this.header }).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'))
  }

  deleteItem(result): Observable<Response> {
    const url = `${this.baseUrl}/deletecontentitem`;
    return this.http.post(`${url}`, JSON.stringify(result[0]), { headers: this.header }).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'))
  }

  setContainerItemPosition(poditionData): Observable<Response> {
    const url = `${this.baseUrl}/setContainerItemPosition`;
    return this.http.post(`${url}`, JSON.stringify(poditionData), { headers: this.header }).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'))
  }

   getCountries(service): Observable<Countries[]> {
    return this.http.get(`${this.baseUrl}/getCountry/${service}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
