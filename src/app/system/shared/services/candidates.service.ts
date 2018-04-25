
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Candidate} from '../models/candidate.model';

@Injectable()
export class CandidatesService {
  constructor(private http: HttpClient){
  }

  url = 'http://localhost:8080/';
  getCandidates():Observable<Candidate[]>{
    return this.http.get<Candidate[]>(this.url+'candidates')
      .map(data => {
        return data;
      });
  }
}
