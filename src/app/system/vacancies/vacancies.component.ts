import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {

  //user: User;
  constructor() { }

  ngOnInit() {

    // this.user =JSON.parse(window.localStorage.getItem('user'));
    // console.log(this.user);
  }

}
