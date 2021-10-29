import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(public httpClient: HttpClient) {
    console.log('Hello Policy data service');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  users: any = [];
  insuredAcc: any;
  policy: any;
  login: any;
  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseURL = 'http://localhost:3000';


  getUsers(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/api/user').pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


  getUWs(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/api/uwusers').pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getUWAssits(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/api/uwausers').pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  verifyUserLogin(credentials) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.baseURL + '/auth/login', credentials)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  //Insured Account
  addInsured(insured) {
    this.httpClient.post(this.baseURL + '/api/insuredinfo', insured).subscribe(res => {
      this.insuredAcc = res;
    });
  }

  addPolicy(policy) {
    this.httpClient.post(this.baseURL + '/api/newpolicy', policy).subscribe(res => {
      this.policy = res;
    }
    );
  }

  //Insured Account
  editInsured(insured) {
    return this.httpClient.put(this.baseURL + '/api/insuredinfo/' + insured.id, insured).subscribe(res => {
      this.insuredAcc = res;
      this.dataChangeSubject.next(true);
    }
    );

  }


  getInsuredWithName(name): Observable<any> {
    return this.httpClient.get(this.baseURL + '/api/insuredwithname/' + name).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  //Insured Account
  getInsured(id): Observable<any> {
    return this.httpClient.get(this.baseURL + '/api/insuredinfo/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  //Insured Account
  getInsureds(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/api/insuredinfo').pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // remove items
  removeItem(item) {
    console.log("Remove Item - id = ", item._id);
    this.httpClient.delete(this.baseURL + '/api/users/remove/' + item._id).subscribe(res => {
      this.users = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(item, id) {
    console.log("updating item ", item._id);
    this.httpClient.put(this.baseURL + '/api/users/' + item._id, item).subscribe(res => {
      this.users = res;
      this.dataChangeSubject.next(true);
    }
    );
  }

  addUser(user) {
    this.httpClient.post(this.baseURL + '/api/user', user);
  }

}
