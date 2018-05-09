import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Candidate} from '../models/candidate.model';
import {BASEURL} from '../../../shared/core/url.constants';


@Injectable()
export class CandidatesService{
  url = BASEURL;

  constructor(private http: HttpClient) {
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

  addNewCandidate(): Observable<any>{
    return this.http.get(this.url + 'addNewCandidate')
      .map(data => {
        return data;
      })
  }

  removeCandidate(id: string): Observable<any>{
    return this.http.get<any>(this.url+'removeCandidate?id='+id);
  }



}
