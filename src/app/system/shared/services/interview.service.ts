import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Interview} from '../models/interview.model';
import {User} from '../../../shared/models/user.model';
import {Candidate} from "../models/candidate.model";


@Injectable()
export class InterviewService {

  url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }


  getEvents(): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.url + 'events')
      .map((data) => {
        return data;
      });
  }

  saveEvents(event: Interview): Observable<Interview> {
    return this.http.post<Interview>(this.url + 'saveEvent', event);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'getUsers')
      .map((users) => {
      return users;
      });
  }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.url + 'candidates')
      .map(data => {
        return data;
      });
  }

}
