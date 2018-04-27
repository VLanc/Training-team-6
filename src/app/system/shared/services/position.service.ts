import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Position} from '../models/position.model';
import data from 'devextreme/bundles/dx.all';

@Injectable()
export class PositionService{
  url = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  // getEvents(): Observable<Interview[]> {
  //   return this.http.get<Interview[]>(this.url + 'events')
  //     .map((data) => {
  //       return data;
  //     });
  // }

  getPositions(): Observable<Position[]>{
    return this.http.get<Position[]>(this.url+'positions')
      .map((data) => {
      return data;
      })
  }
}
