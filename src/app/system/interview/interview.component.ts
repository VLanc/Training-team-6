import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterviewComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor() {}
  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      contentHeight: 'auto',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [
        {
          title  : 'event1',
          start  : '2018-04-17',
          color  : 'red'
        },
        {
          title  : 'event2',
          start  : '2018-04-18',
          end    : '2018-04-19'
        },
        {
          title  : 'event3',
          start  : '2018-04-20T12:30:00',
          allDay : false // will make the time show
        }
      ]
    };
  }
}
