import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Candidate} from '../shared/models/candidate.model';
import {CandidatesService} from '../shared/services/candidates.service';
import {Interview} from '../shared/models/interview.model';
import {InterviewService} from '../shared/services/interview.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  candidates: Candidate[];
  interviews: Interview[];
  /*Interviews from server*/
  customInterviews: [{ start: Date, end: Date, participants: string }] = [{
    start: undefined,
    end: undefined,
    participants: ''
  }];
  /*Selected interviews for display*/
  areCandidatesScrollable: boolean = false;
  areInterviewsScrollable: boolean = false;
  @Output() changeNotificationBarState = new EventEmitter();
  @Input() areThereNewCandidates: boolean;
  @Input() areThereNextInterviews: boolean;

  constructor(private candidateService: CandidatesService, private interviewService: InterviewService) {
  }

  hideNotifications() {
    this.changeNotificationBarState.emit();
  }

  ngOnInit() {
    this.candidateService.getCandidates()
      .subscribe(candidates => {
        this.candidates = candidates;

        /*leave only new candidates*/
        for (let i = 0; i < this.candidates.length; i++) {
          if (this.candidates[i].status.toLowerCase() === 'new') {
            if (!this.candidates[i].photo) this.candidates[i].photo = 'anounymus';
          } else {
            this.candidates.splice(i, 1);
            i--;
          }
        }

        if (!this.candidates.length) this.areThereNewCandidates = false;
        else this.areThereNewCandidates = true;
      });

    this.interviewService.getEvents()
      .subscribe(interviews => {
        this.interviews = interviews;

        /*max length of the participants list = 2*/
        for (let i = 0; i < this.interviews.length; i++) {
          let participantsLength = this.interviews[i].participants.length;
          let residualParticipants = '';
          if (participantsLength > 2) {
            residualParticipants = `${participantsLength - 2}`;
            participantsLength = 2;
          }

          /*fill start date and time and end time field of the first interview or the rest in the interviews list*/
          if (i === 0) {
            this.customInterviews[i].start = new Date(this.interviews[i].start);
            this.customInterviews[i].start.setHours(this.customInterviews[i].start.getHours() - 3);
            this.customInterviews[i].end = new Date(this.interviews[i].end);
            this.customInterviews[i].end.setHours(this.customInterviews[i].end.getHours() - 3);
          } else {
            let startDate = new Date(this.interviews[i].start);
            startDate.setHours(startDate.getHours() - 3);
            let endDate = new Date(this.interviews[i].end);
            endDate.setHours(endDate.getHours() - 3);
            this.customInterviews.push({
              start: startDate,
              end: endDate,
              participants: ''
            });
          }

          /*fill participants list*/
          for (let j = 0; j < participantsLength; j++) {
            if (j === participantsLength - 1) {
              /*if participantsLength > 3*/
              if (residualParticipants) this.customInterviews[i].participants += `${this.interviews[i].participants[j]['participant']} +${residualParticipants}`;
              else this.customInterviews[i].participants += `${this.interviews[i].participants[j]['participant']}`;
              /*remove comma at the end*/
              break;
            }
            this.customInterviews[i].participants += `${this.interviews[i].participants[j]['participant']}, `;
          }
        }

        /*Remove all events until today*/
        for (let i = 0; i < this.customInterviews.length; i++) {
          if (new Date(this.customInterviews[i].start) < new Date()) {
            this.customInterviews.splice(i, 1);
            i--;
          }
        }

        if (!this.customInterviews.length) {
          this.areThereNextInterviews = false;
          return;
        } else this.areThereNextInterviews = true;

        /*Sort interviews ascending*/
        this.customInterviews.sort((interview, anotherInterview) => {
          if (interview.start > anotherInterview.start) return 1;
        });
      });
  }

  showAllCandidates(candidatesFieldRef) {
    if (this.areCandidatesScrollable) {
      candidatesFieldRef.scrollTo(0, 0);
      this.areCandidatesScrollable = false;
    } else this.areCandidatesScrollable = true;
  }

  showAllInterviews(interviewsFieldRef) {
    if (this.areInterviewsScrollable) {
      interviewsFieldRef.scrollTo(0, 0);
      this.areInterviewsScrollable = false;
    } else this.areInterviewsScrollable = true;
  }
}
