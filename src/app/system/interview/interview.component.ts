import {Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Interview} from '../shared/models/interview.model';
import {InterviewService} from '../shared/services/interview.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css'],
  /*styleUrls: ['./interview-modal.component.css'],*/
  encapsulation: ViewEncapsulation.None,
  providers: [NgbActiveModal]
})
export class InterviewComponent implements OnInit {
  interviews: Interview[];
  eventsLength: number;

  participants = ['Alex Sakovsky', 'Vlad Vasilyev', 'Nikita Senko', 'Petya Petrov'];
  colors: [{ name: string, code: string }] = [
    {
      name: 'red',
      code: '#e74c3c'
    },
    {
      name: 'blue',
      code: '#3498db'
    },
    {
      name: 'yellow',
      code: '#f1c40e'
    },
    {
      name: 'brown',
      code: '#a5860a'
    },
    {
      name: 'grey',
      code: '#95a5a6'
    },
    {
      name: 'green',
      code: '#27ae60'
    },
    {
      name: 'orange',
      code: '#f39c12'
    },
    {
      name: 'purple',
      code: '#9b59b6'
    }
  ];
  selectedStartDate: Date;
  selectedEndDate: Date;
  selectedTitle = '';
  selectedParticipant = '';
  selectedParticipantIndex: number;
  selectedLocation = '';
  selectedColor: any = {name: 'current', code: '#3a87ad'};
  selectedDescription = '';
  isTitleInvalid = false;
  isStartDateInvalid = false;
  isEndDateInvalid = false;
  isParticipantInvalid = false;

  isOtherOptionsVisible = false;

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private interviewService: InterviewService,
              private router: Router) {
  }

  updateEventCalendar(event: Interview) {
    this.ucCalendar.fullCalendar('renderEvent', event);
  }


  ngOnInit() {
    this.interviewService.getEvents()
      .subscribe(interviews => {
        this.interviews = interviews;
        this.eventsLength = this.interviews.length;
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
          events: this.interviews
        };
      });
  }

  openSm(content, eventDetail) {
    if (eventDetail) {
      this.selectedStartDate = new Date(eventDetail.date._d.setHours(0, 0));
      this.selectedEndDate = new Date(eventDetail.date._d.setHours(23, 59));
    } else {
      this.selectedStartDate = new Date();
      this.selectedEndDate = new Date();
    }

    this.activeModal = this.modalService.open(content, {size: 'sm'});
  }

  updateTitle(event: Event) {
    this.selectedTitle = (<HTMLInputElement>event.target).value;
  }

  updateParticipant(event: Event) {
    this.selectedParticipantIndex = +(<HTMLSelectElement>event.target).value;
    this.selectedParticipant = this.participants[this.selectedParticipantIndex - 1];
  }

  updateLocation(event: Event) {
    this.selectedLocation = (<HTMLInputElement>event.target).value;
  }

  updateDescription(event: Event) {
    this.selectedDescription = (<HTMLTextAreaElement>event.target).value;
  }

  showOtherOptions() {
    this.isOtherOptionsVisible ? this.isOtherOptionsVisible = false : this.isOtherOptionsVisible = true;
  }

  changeCurrentColor(event: Event) {

    this.selectedColor.name = `${(<HTMLDivElement>event.target).classList[1]}`;
    for (let color of this.colors) {
      if (color.name === this.selectedColor.name) {
        this.selectedColor.code = color.code;
        break;
      }
    }
  }

  checkTitle() {
    if (!this.selectedTitle) {
      this.isTitleInvalid = true;
      return false;
    } else {
      this.isTitleInvalid = false;
      return true;
    }
  }

  checkStartDate() {
    if (!this.selectedStartDate) {
      this.isStartDateInvalid = true;
      return false;
    } else {
      this.isStartDateInvalid = false;
      return true;
    }
  }

  checkEndDate() {
    if (!this.selectedEndDate) {
      this.isEndDateInvalid = true;
      return false;
    } else {
      this.isEndDateInvalid = false;
      return true;
    }
  }

  checkParticipant() {
    if (!this.selectedParticipantIndex) {
      this.isParticipantInvalid = true;
      return false;
    } else {
      this.isParticipantInvalid = false;
      return true;
    }
  }

  checkFieldsValidation() {
    let correctnessOfFields = [];

    correctnessOfFields.push(this.checkTitle());
    correctnessOfFields.push(this.checkStartDate());
    correctnessOfFields.push(this.checkEndDate());
    correctnessOfFields.push(this.checkParticipant());

    for (let i = 0; i < correctnessOfFields.length; i++) {
      if (!correctnessOfFields[i]) return false;
    }

    return true;
  }

  clearModalWindow() {
    this.selectedStartDate = new Date();
    this.selectedEndDate = new Date();
    this.selectedTitle = '';
    this.selectedParticipant = '';
    this.selectedParticipantIndex = 0;
    this.selectedLocation = '';
    this.selectedColor = {name: 'current', code: '#3a87ad'};
    this.selectedDescription = '';
    this.isTitleInvalid = false;
    this.isStartDateInvalid = false;
    this.isEndDateInvalid = false;
    this.isParticipantInvalid = false;
    this.isOtherOptionsVisible = false;
  }

  saveEvent() {
    if (!this.checkFieldsValidation()) return;
    this.activeModal.close();
    let event = {
      id: ++this.eventsLength,
      title: `${this.selectedTitle} - ${this.selectedParticipant}`,
      allDay: false,
      start: this.selectedStartDate,
      end: this.selectedEndDate,
      color: this.selectedColor.code,
      participant: this.selectedParticipant,
      participantIndex: this.selectedParticipantIndex,
      location: this.selectedLocation,
      description: this.selectedDescription
    };
    this.updateEventCalendar(event);
    this.clearModalWindow();
    this.interviewService.saveEvents(event).subscribe();
    this.router.navigate(['/interview']);
  }

}
