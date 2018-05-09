import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Interview} from '../shared/models/interview.model';
import {InterviewService} from '../shared/services/interview.service';
/*import {Router} from '@angular/router';*/
import {User} from '../../shared/models/user.model';

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
  interviewId: number;
  eventsLength: number;
  users: User[];

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

  selectedCurrentStartDate: Date;
  selectedNewStartDate: Date;
  selectedEndDate: Date;

  participantsList = [];
  participantsDropdownSettings = {};
  selectedParticipants = [];

  interviewersList = [];
  interviewersDropdownSettings = {};
  selectedInterviewers = [];

  selectedLocation = '';
  selectedColor: { name: string, code: string } = this.colors[0];
  selectedDescription = '';
  isNewStartDateInvalid = false;
  isStartDateHintVisible = false;
  startDateHint = '';
  isEndTimeHintVisible = false;
  endTimeHint = '';
  isEndTimeInvalid = false;
  isParticipantsInvalid = false;
  isInterviewersInvalid = false;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;


  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private interviewService: InterviewService/*,
              private router: Router*/) {
  }

  updateEventCalendar(event: Interview) {
    console.log(this.interviews);
    /*this.ucCalendar.fullCalendar('removeEvents');*/
    /*this.ucCalendar.fullCalendar('refetchEventSources', this.interviews);*/
    /*this.ucCalendar.fullCalendar('addEventSource', this.interviews);*/
    /*this.ucCalendar.fullCalendar('renderEvent', event);*/
    /*this.ucCalendar.fullCalendar('refetchEvents');*/
    /*this.ucCalendar.fullCalendar('renderEvent', event);*/
    /*this.ucCalendar.fullCalendar('renderEvent', event);*/
    /*this.ucCalendar.fullCalendar('rerenderEvents');*/
  /*  this.ucCalendar.fullCalendar('renderEvent', event);
    this.ucCalendar.fullCalendar('rerenderEvents');*/
  }


  ngOnInit() {
    this.participantsDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'participant',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.interviewService.getUsers()
      .subscribe(users => {
        for (let user of users) {
          if (user.name.length > 1)
          {
            this.interviewersList.push({id: user.id, interviewer: user.name + ' ' + user.surname});
          }

        }
      });

    // this.participantsList = [
    //   {id: 1, participant: 'Alex Sakovsky'},
    //
    this.interviewService.getCandidates()
      .subscribe(participants => {
        for (let participant of participants) {
          if (participant.name.length > 1){
            this.participantsList.push({id: participant.id, participant: participant.name});
          }

        }
      });
    this.interviewersDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'interviewer',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.interviewService.getEvents()
      .subscribe(interviews => {
        this.interviews = interviews;
        this.eventsLength = this.interviews.length;
    /*    for (let i = 0; i < this.interviews.length; i++) {
          this.interviews[i].start = new Date(this.interviews[i].start).setHours()
        }*/
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

  openCreateInterviewWindow(content, eventDetail?) {
    console.log(eventDetail);
    this.clearModalWindow();
    if (eventDetail && eventDetail.event) {
      this.interviewId = eventDetail.event.id;
      this.selectedCurrentStartDate = new Date(eventDetail.event.start);
      this.selectedNewStartDate = new Date(this.selectedCurrentStartDate);
      /*this.selectedNewStartDate.setHours(this.selectedNewStartDate.getUTCHours());*/ // convert the start hours to the UTC format
      this.selectedEndDate = new Date(eventDetail.event.end);
      /*this.selectedEndDate.setHours(this.selectedEndDate.getUTCHours());*/ // convert the end hours to the UTC format
      this.selectedParticipants = eventDetail.event.participants || [];
      this.selectedInterviewers = eventDetail.event.interviewers || [];
      for (let i = 0; i < this.colors.length; i++) {
        if (this.colors[i].code === eventDetail.event.color) {
          this.selectedColor = {name: this.colors[i].name, code: this.colors[i].code};
          break;
        }
        if (i === this.colors.length - 1) this.selectedColor = {name: 'default', code: '#3a87ad'};
      }

      this.selectedLocation = eventDetail.event.location || '';
      this.selectedDescription = eventDetail.event.description || '';

    } else if (eventDetail && eventDetail.date) {
      this.interviewId = ++this.eventsLength;
      this.selectedCurrentStartDate = new Date(eventDetail.date._d.setHours(new Date().getHours(), new Date().getMinutes()));
      this.selectedNewStartDate = new Date(this.selectedCurrentStartDate);
      this.selectedEndDate = new Date(eventDetail.date._d.setHours(new Date().getHours(), new Date().getMinutes()));
      this.selectedColor = {name: 'default', code: '#3a87ad'};
    } else {
      this.interviewId = ++this.eventsLength;
      this.selectedCurrentStartDate = new Date();
      this.selectedNewStartDate = new Date(this.selectedCurrentStartDate);
      this.selectedEndDate = new Date(this.selectedCurrentStartDate);
      this.selectedColor = {name: 'default', code: '#3a87ad'};
    }

    this.activeModal = this.modalService.open(content, {size: 'lg', centered: true});
  }


  closeModalWindow() {
    this.clearModalWindow();
    this.activeModal.close();
  }

  updateLocation(event: Event) {
    this.selectedLocation = (<HTMLInputElement>event.target).value;
  }

  updateDescription(event: Event) {
    this.selectedDescription = (<HTMLTextAreaElement>event.target).value;
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


  checkStartDate() {
    if (!this.selectedNewStartDate) {
      this.isNewStartDateInvalid = true;
      this.startDateHint = 'This field is required';
      this.isStartDateHintVisible = true;
      return false;
    } else if (new Date(this.selectedCurrentStartDate).getTime() > new Date(this.selectedNewStartDate).getTime()) {
      this.isNewStartDateInvalid = true;
      this.startDateHint = "You can't set the date less than the current";
      this.isStartDateHintVisible = true;
      return false;
    } else {
      this.isNewStartDateInvalid = false;
      this.startDateHint = '';
      this.isStartDateHintVisible = false;
      return true;
    }
  }

  checkEndTime() {
    this.selectedEndDate.setSeconds(this.selectedNewStartDate.getSeconds(), this.selectedNewStartDate.getMilliseconds());
    console.log(this.selectedNewStartDate.getTime());
    console.log(this.selectedEndDate.getTime());
    if (this.selectedNewStartDate.getTime() >= this.selectedEndDate.getTime()) {
      this.isEndTimeInvalid = true;
      this.endTimeHint = 'This time must be greater than the start time';
      this.isEndTimeHintVisible = true;
      return false;
    } else {
      this.isEndTimeInvalid = false;
      this.endTimeHint = '';
      this.isEndTimeHintVisible = false;
      return true;
    }
  }

  checkParticipants() {

    if (!this.selectedParticipants.length) {
      this.isParticipantsInvalid = true;
      return false;
    } else {
      this.isParticipantsInvalid = false;
      return true;
    }
  }

  checkInterviewers() {

    if (!this.selectedInterviewers.length) {
      this.isInterviewersInvalid = true;
      return false;
    } else {
      this.isInterviewersInvalid = false;
      return true;
    }
  }

  checkFieldsValidation() {
    const correctnessOfFields = [];

    /*   correctnessOfFields.push(this.checkTitle());*/
    correctnessOfFields.push(this.checkStartDate());
    correctnessOfFields.push(this.checkEndTime());
    /* correctnessOfFields.push(this.checkEndDate());*/
    correctnessOfFields.push(this.checkParticipants());
    correctnessOfFields.push(this.checkInterviewers());

    for (let i = 0; i < correctnessOfFields.length; i++) {
      if (!correctnessOfFields[i]) {
        return false;
      }
    }

    return true;
  }

  clearModalWindow() {
    this.selectedNewStartDate = new Date();
    this.selectedEndDate = new Date();
    this.selectedParticipants = [];
    this.selectedInterviewers = [];
    this.selectedLocation = '';
    this.selectedColor = {name: 'default', code: '#3a87ad'};
    this.selectedDescription = '';
    this.isNewStartDateInvalid = false;
    this.isStartDateHintVisible = false;
    this.startDateHint = '';
    this.isEndTimeInvalid = false;
    this.isEndTimeHintVisible = false;
    this.endTimeHint = '';
    this.isParticipantsInvalid = false;
    this.isInterviewersInvalid = false;
  }

  saveEvent() {
    // set the end date equal to the start date
    this.selectedEndDate = new Date(this.selectedEndDate.setFullYear(this.selectedNewStartDate.getFullYear(), this.selectedNewStartDate.getMonth(), this.selectedNewStartDate.getDate()));

    if (!this.checkFieldsValidation()) return;
    this.activeModal.close();

    let participantsStr = '';
    for (let i = 0; i < this.selectedParticipants.length; i++) {
      if (i !== this.selectedParticipants.length - 1) {
        participantsStr += `${this.selectedParticipants[i].participant}, `;
      } else participantsStr += `${this.selectedParticipants[i].participant}`;
    }

    let event = {
      id: this.interviewId,
      title: participantsStr,
      allDay: false,
      start: new Date(this.selectedNewStartDate),
      end: new Date(this.selectedEndDate),
      color: this.selectedColor.code,
      participants: this.selectedParticipants,
      interviewers: this.selectedInterviewers,
      location: this.selectedLocation,
      description: this.selectedDescription
    };
    console.log(event);
    this.clearModalWindow();
    this.interviewService.saveEvents(event).subscribe();
    /*this.updateEventCalendar(event);*/

    this.interviewService.getEvents()
      .subscribe(interviews => {
        this.interviews = interviews;
      });

    setTimeout(() => {
      this.ucCalendar.fullCalendar('refetchEvents');
    }, 100);
    /*this.router.navigate(['/interview']);*/
  }
}
