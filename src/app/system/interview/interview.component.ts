import {Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterviewComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor() {
  }

  events: [
    {
      id: number,
      title: string,
      allDay: boolean,
      start: Date,
      end: Date,
      color: string,
      participant: string,
      participantIndex: number,
      location: string,
      description: string
    }
    ] = [
    {
      id: 1,
      title: "SUPER EVENT",
      allDay: false,
      start: new Date("2018-04-27T15:29"),
      end: new Date("2018-04-28T18:26"),
      color: "#27ae60",
      participant: "Alex Sakovsky",
      participantIndex: 1,
      location: "Pinsk",
      description: "Mega ADFDSAFDSA"
    },
    {
      id: 2,
      title: "Event 2",
      allDay: false,
      start: new Date("2018-04-05T14:35"),
      end: new Date("2018-04-07T18:26"),
      color: "#f39c12",
      participant: "Vlad Vasilyev",
      participantIndex: 2,
      location: "Minsk",
      description: "Text"
    },
    {
      id: 3,
      title: "SD",
      allDay: false,
      start: new Date("2018-04-02T00:00"),
      end: new Date("2018-04-03T23:59"),
      color: "#f1c40e",
      participant: "Nikita Senko",
      participantIndex: 3,
      location: "Minsk",
      description: "Some description"
    }
  ];

  @Output() eventsLength = this.events.length;
  /*@Output() eventLength = new EventEmitter<{length: number}>();*/
  @Input('content') content;

  /*  @Input() event: {
      id: number,
      title: string,
      allDay: boolean,
      start: string,
      end: string,
      color: string,
      participant: string,
      participantIndex: number,
      location: string,
      description: string
    };*/
  updateEventCalendar(event: {
    id: number,
    title: string,
    allDay: boolean,
    start: Date,
    end: Date,
    color: string,
    participant: string,
    participantIndex: number,
    location: string,
    description: string
  }) {
    this.ucCalendar.fullCalendar('renderEvent', event);
    console.log(event);
  }

  /*  @Input('openSm') openModal;*/

  /*  @Output() myEvent = new EventEmitter();
    dayClick(event) {
      event()
      /!*this.myEvent.emit(null);*!/
    }*/

  ngOnInit() {
    this.calendarOptions = {
      /*      editable: true,*/
      eventLimit: true,
      weekNumberCalculation: 'ISO',
      selectable: true,
      contentHeight: 'auto',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: this.events
    };
  }

}
