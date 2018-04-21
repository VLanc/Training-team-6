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
      // return this.http.get(this.url+`login?email=`+email)
      //   .map(response => {
      //     return response;
      //   });
    return this.http.get<User>(this.url+`login?email=`+email)
      .map((data) => {
        return data;
      });
  }

  resetUserPassword(email : string) :Observable<string> {
     return this.http.get<string>(this.url+`reset?email=`+email);

  }

  // getUsers() : Observable<User[]> {
  //   return this.http.get('users.json').map(data=>{
  //     let usersList = data["userList"];
  //     return usersList.map(function(user:any) {
  //       return {name: user.userName, age: user.userAge};
  //     });
  //   });
}
