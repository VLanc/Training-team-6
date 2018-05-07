import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Candidate} from '../models/candidate.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class CandidatesService extends BaseApi {
  url = 'http://localhost:8080/';

  constructor(public http: HttpClient) {
    super(http);
  }


  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.url + 'candidates')
      .map(data => {
        return data;
      });
  }

  getCandidateFromId(id: string): Observable<Candidate>{
    return this.http.get<Candidate>(this.url + 'id-candidates?id='+id)
      .map(data => {
        return data;
      });
  }

  saveCandidate(candidate: Candidate):  Observable<Candidate>{
    return this.http.post<Candidate>(this.url + 'saveCandidate', candidate)
      .map( data => {
        return data;
      });
  }



}
