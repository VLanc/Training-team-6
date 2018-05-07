import {Component, OnInit} from '@angular/core';
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
  interviews: Interview[]; /*Interviews form server*/
  customInterviews: [{start: Date, end: Date, participants: string}] = [{start: undefined, end: undefined, participants: ''}]; /*Selected interviews for display*/
  areCandidatesScrollable: boolean = false;
  areInterviewsScrollable: boolean = false;

  constructor(private candidateService: CandidatesService, private interviewService: InterviewService) {
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
      });

    this.interviewService.getEvents()
      .subscribe(interviews => {
        this.interviews = interviews;

        /*max length of the participants list = 3*/
        for (let i = 0; i < this.interviews.length; i++) {
          let participantsLength = this.interviews[i].participants.length;
          let residualParticipants = '';
          if (participantsLength > 3) {
            residualParticipants = `${participantsLength - 3}`;
            participantsLength = 3;
          }

          /*fill start date and time and end time field of the first interview or the rest in the interviews list*/
          if (i === 0) {
            this.customInterviews[i].start = this.interviews[i].start;
            this.customInterviews[i].end = this.interviews[i].end;
          } else this.customInterviews.push({start: this.interviews[i].start, end: this.interviews[i].end, participants: ''});

          /*fill participants list*/
          for (let j = 0; j < participantsLength; j++) {
            if (j === participantsLength - 1) {
              if (residualParticipants) this.customInterviews[i].participants += `${this.interviews[i].participants[j]['participant']} +${residualParticipants}`;  /*if participantsLength > 3*/
              else this.customInterviews[i].participants += `${this.interviews[i].participants[j]['participant']}`;  /*remove comma at the end*/
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
