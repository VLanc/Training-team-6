import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Interview} from '../models/interview.model';


@Injectable()
export class InterviewService {

  url = 'https://hrapp-mifort.herokuapp.com/';
  constructor(private http: HttpClient) {}


  getEvents(): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.url + 'events')
      .map((data) => {
      return data;
      });
  }

  saveEvents(event: Interview): Observable<Interview> {
    return this.http.post<Interview>(this.url+'saveEvent', event);
  }





}
