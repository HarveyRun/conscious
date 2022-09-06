import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public base_url = '/api';
  //"target": "https://api.superbed.cn/upload",

  //text/plain
  //application/json;charset=UTF-8
  //multipart/form-data;charset=UTF-8
  //application/x-www-form-urlencoded;charset=UTF-8
  // let headers = new HttpHeaders();
  // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers: HttpHeaders = new HttpHeaders({'Content-Type':'multipart/form-data;charset=UTF-8'});

  constructor(public http: HttpClient) {}

  // get请求
  doGet(url: any, params?: any) {
    console.log(params);
    return new Observable(observer => {
      this.http.get(this.base_url + url, params).subscribe(response => {
        observer.next(response);
      }, err => {
        observer.error(err);
      });
    });
  }

  // post请求
  doPost(url: any, params?: any) {
    return new Observable(observer => {
      this.http.post(this.base_url + url, params).subscribe(response => {
        observer.next(response);
      }, err => {
        observer.error(err);
      });
    });
  }
}

