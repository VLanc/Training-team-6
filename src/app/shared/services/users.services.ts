import {Injectable} from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {BASEURL} from "../core/url.constants";
import 'rxjs/add/operator/map';


@Injectable()
export class UsersServices{

   url = BASEURL;
  constructor(private http: HttpClient) {
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.url + `getUserByEmail?email=` + email)
      .map((data) => {
        return data;
      });
  }

  loginUser(email: string, password: string): Observable<User> {
    return this.http.get<User>(this.url + `login?email=` + email+`&password=`+password)
      .map((data) => {
        return data;
      });
  }



  resetUserPassword(email: string): Observable<string> {
     return this.http.get<string>(this.url + `reset?email=` + email);

  }


  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'register', user)
      .map( data => {
        return data;
      });
  }


  saveUserChanges(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'saveUser', user);
  }

  uploadUserAvatar(formdata: FormData): Observable<any> {
    return this.http.post<any>(this.url + 'uploadUserAvatar', formdata);
  }

}
