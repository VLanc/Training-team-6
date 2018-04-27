import {Component, OnInit} from '@angular/core';
import {Vacancy} from '../shared/models/vacancy.model';
import {VacanciesService} from '../shared/services/vacancies.service';
import {PositionService} from '../shared/services/position.service';
import {Position} from '../shared/models/position.model';


@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {
  vacancies: Vacancy[];
  positions: Position[];

  constructor(private vacanciesService: VacanciesService,
              private positionService: PositionService) {
  }

  getWeek(num) {
    return Math.ceil(num / 7);
  }

  getEnding(number) {
    return number > 1 ? 's' : '';
  }

  ngOnInit() {
    this.vacanciesService.getVacancies()
      .subscribe(vacancies => {
        this.vacancies = vacancies;
        for (let i = 0; i < this.vacancies.length; i++) {

          let now: number = new Date().getTime() / 1000;
          let dateOfAddVacancy: number = (now - +this.vacancies[i].date) / 86400;
          if (dateOfAddVacancy < 1) this.vacancies[i].date = 'today';
          else if (2 < dateOfAddVacancy && 7 > dateOfAddVacancy) this.vacancies[i].date = Math.ceil(dateOfAddVacancy) + ' days later';
          else if (7 < dateOfAddVacancy && 27 > dateOfAddVacancy) this.vacancies[i].date = 'about ' + this.getWeek(dateOfAddVacancy) + ' week' + this.getEnding(this.getWeek(dateOfAddVacancy)) + ' later';
          else if (27 < dateOfAddVacancy) this.vacancies[i].date = 'a month ago';
        }
      });
    this.positionService.getPositions()
      .subscribe(positions => {
        this.positions = positions;
        console.log(this.positions);
      })

  }

}
