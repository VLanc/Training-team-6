import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Candidate} from '../models/candidate.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class CandidatesService extends BaseApi{
  url = 'http://localhost:8080/';
  constructor(public http: HttpClient){
    super(http);
  }


  getCandidates():Observable<Candidate[]>{
    return this.http.get<Candidate[]>(this.url+'candidates')
      .map(data => {
        return data;
      });
  }

  // getCandidates():Observable<Candidate[]>{
  //   return this.get('candidates');
  // }
}
