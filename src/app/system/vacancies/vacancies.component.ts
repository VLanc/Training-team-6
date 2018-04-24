import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {
  employees: [{id: number, position: string, experience: string, salary: string, date: Date}] = [
    {
      id: 1,
      position: "Java Developer",
      experience: "Junior",
      salary: "1000$",
      date: new Date(1521342620)
    },
    {
      id: 2,
      position: "JavaScript Developer",
      experience: "Middle",
      salary: "1500$",
      date: new Date(1521042520)
    },
    {
      id: 3,
      position: "HR",
      experience: "Junior",
      salary: "800$",
      date: new Date(1521942625)
    },
    {
      id: 4,
      position: "Ruby Developer",
      experience: "Senior",
      salary: "3000$",
      date: new Date(1521043720)
    },
    {
      id: 5,
      position: "DevOps",
      experience: "Middle",
      salary: "2000$",
      date: new Date(1520242629)
    },
    {
      id: 6,
      position: "C++ Developer",
      experience: "Junior",
      salary: "800$",
      date: new Date(1521542621)
    },
    {
      id: 7,
      position: "PHP Developer",
      experience: "Junior",
      salary: "700$",
      date: new Date(1521143630)
    },
    {
      id: 8,
      position: "Project Manager",
      experience: "Middle",
      salary: "1500$",
      date: new Date(1521172628)
    },
    {
      id: 9,
      position: "Python Developer",
      experience: "Senior",
      salary: "3000$",
      date: new Date(1511262620)
    }
    ];

  constructor() { }

  ngOnInit() {
  }

}
