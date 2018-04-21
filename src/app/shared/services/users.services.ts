import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse } from '@angular/common/http';
import {Response} from "@angular/http"
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.model";
import "rxjs/add/operator/map";


@Injectable()
export class UsersServices {

  url:string = "http://localhost:8080/";
  constructor(private http: HttpClient) {}

  getUserByEmail(email : string): Observable<User> {
    return this.http.get<User>(this.url+`login?email=`+email)
      .map((data) => {
        return data;
      });
  }

  resetUserPassword(email : string) :Observable<string> {
     return this.http.get<string>(this.url+`reset?email=`+email);

  }


}
