import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-id-candidate',
  templateUrl: './id-candidate.component.html',
  styleUrls: ['./id-candidate.component.css']
})
export class IdCandidateComponent implements OnInit {

  public user = {
    'id': '4',
    'date': '1520336364',
    'position': 'Java Developer',
    'status': 'CV-Rejected',
    'name': 'Дядя Федор',
    'address': 'Простоквашино',
    'city': 'from Moscow',
    'mobileNumber': '+375447549706',
    'homeNumber': '+375172245587',
    'email': 'Ivan_ivanov@mail.ru',
    'salary': '250000$',
    'photo': '../../../assets/10.png',
    'skills': 'JavaScript;Java;C++;C#;Node.JS;Maven;JSF;JPA;SEE;5+;Lel',
    'description': [
      {
        'name': 'Мама',
        'review': 'тагяется с блохастыми животными, социопат'
      },
      {
        'name': 'Печкин',
        'review': 'они бы еще с чемоданом за грибами пошли'
      }
    ],
    'info': [
      {
        'time': 'Apr 2015 – Now',
        'pos': 'Learn Java Developer',
        'header': 'Itransition Group Ltd.',
        'body': 'WEB Development, work with server side logic, take part in search engine development and optimization'
      },
      {
        'time': 'Oct 2012 – Mar 2015<br>(2 year 7 month)',
        'pos': 'Senior Java Developer<br>London UK',
        'header': 'Belhard',
        'body': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
        }
    ],
    'education': [
      {
        'time': 'Oct 2012 – Mar 2015<br>(2 year 7 month)',
        'pos': 'STUDENT',
        'header': 'BSUIR',
        'body': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {
  }

}
