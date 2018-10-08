import { Injectable } from '@angular/core';
import {
  DistributionServices, DistributionActions,
  DistributionSources, DistributionTypes, getAllTransactions, getByTransactionId
} from '../models/distributionModel';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';


import { GlobalService } from '../../config/global.service';


@Injectable()
export class DistributionService {
  private baseUrl = '';
  private headers: any;
  // private bufferHeader: any;
  private setTransactionData: getByTransactionId[] = [];
  constructor(private http: Http, private globalService: GlobalService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    // this.bufferHeader = new Headers({ 'Content-Type': 'arraybuffer' });
    this.baseUrl = globalService.apiDistributionAddress;
    console.log(this.baseUrl);
  }

  getDistributionService(typeId, categoryId): Observable<DistributionServices[]> {
    return this.http.get(`${this.baseUrl}/getServices/?typeId=${typeId}&categoryId=${categoryId}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getDistributionActions(): Observable<DistributionActions[]> {
    return this.http.get(`${this.baseUrl}/getDistributionActions/`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getDistributionSources(): Observable<DistributionSources[]> {
    return this.http.get(`${this.baseUrl}/getDistributionSources/`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getDistributionTypes(): Observable<DistributionTypes[]> {
    return this.http.get(`${this.baseUrl}/getDistributionTypes/`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getAllTransactions(): Observable<getAllTransactions[]> {
    return this.http.get(`${this.baseUrl}/getAllTransactions/`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getAllTransactionsBySorting(page, size, sortBy, orderBy): Observable<any> {
    return this.http.get(`${this.baseUrl}/getTransaction/?page=${page}&size=${size}&sort=${sortBy},${orderBy}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getByTransactionId(transactionId): Observable<getByTransactionId[]> {
    return this.http.get(`${this.baseUrl}/getByTransactionId/${transactionId}`)
      .map((res: Response) => {
        this.setTransactionDataById(res.json());
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  setTransactionDataById(data) {
    this.setTransactionData = data;

  }

  getTransactionDataById() {
    return this.setTransactionData;
  }


  createTransaction(result): Observable<Response> {
    const url = `${this.baseUrl}/createTransaction`;
    return this.http.post(`${url}`, JSON.stringify(result), { headers: this.headers }).
      map((res: Response) => res.json()).
      catch((error: any) => Observable.throw('server error'));
  }
  downloadArtist(id): Observable<Response> {


    return this.http.get(`${this.baseUrl}/download/artists/${id}`, {  responseType: ResponseContentType.Blob})
        // return this.http.get(`http://192.168.207.215:8081/distribution/download/artists/${id}`, {  responseType: ResponseContentType.Blob})
    .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
