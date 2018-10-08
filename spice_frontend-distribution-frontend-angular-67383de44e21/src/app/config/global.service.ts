import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  'apiBaseAddress'= 'http://52.17.5.177:8080/api';
  // 'apiBaseAddress'= 'http://54.154.195.75:8080/api';
  //'apiBaseAddress'= 'http://192.168.207.175:8080/api';
  // tslint:disable-next-line:max-line-length
  'apiDistributionAddress'= 'http://52.17.5.177:8081/distribution';
                                                                           ;
}
