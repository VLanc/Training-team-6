import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Vacancy} from '../models/vacancy.model';

@Injectable()
export class VacanciesService {
  url = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  getVacancies(): Observable<Vacancy[]>{
    return this.http.get<Vacancy[]>(this.url+'vacancies')
      .map(data => {
        return data;
      })
  }

  saveVacancy(vacancy: Vacancy): Observable<Vacancy>{
    return this.http.post<Vacancy>(this.url+'saveVacancy', vacancy);
  }


}
