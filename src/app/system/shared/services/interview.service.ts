import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Interview} from '../models/interview.model';


@Injectable()
export class InterviewService {

  url = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}


  getEvents(): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.url + 'events')
      .map((data) => {
      return data;
      });
  }


}
