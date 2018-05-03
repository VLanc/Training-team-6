import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import 'rxjs/add/operator/map';
import {BaseApi} from '../core/base-api';


@Injectable()
export class UsersServices extends BaseApi{

   url = 'http://localhost:8080/';
  constructor(public http: HttpClient) {
    super(http)
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.url + `login?email=` + email)
      .map((data) => {
        return data;
      });
  }

  // getUserByEmail(email: string): Observable<User> {
  //   return this.get(`login?email=${email}`);
  // }

  resetUserPassword(email: string): Observable<string> {
     return this.http.get<string>(this.url + `reset?email=` + email);

  }

  // resetUserPassword(email: string): Observable<string> {
  //   return this.get(`reset?email=${email}`);
  //
  // }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'register', user)
      .map( data => {
        return data;
      });
  }

  // createNewUser(user: User): Observable<User> {
  //   return this.post('register', user);
  // }

  saveUserChanges(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'saveUser', user);
  }

  // saveUserChanges(user: User): Observable<User> {
  //   return this.post('saveUser', user);
  // }

}
