import { Component, OnInit } from '@angular/core';
import {Vacancy} from '../shared/models/vacancy.model';
import {VacanciesService} from '../shared/services/vacancies.service';


@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {
  vacancies: Vacancy[];
  constructor(private vacanciesService: VacanciesService) { }

  ngOnInit() {
  this.vacanciesService.getVacancies()
    .subscribe(vacansies => {
      this.vacancies = vacansies;
      this.vacancies.map(function (value) {
        value.date = new Date(value.date);
      });
    })

  }

}
