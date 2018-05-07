import {Component, OnInit, ViewChild} from '@angular/core';
import {Candidate} from '../shared/models/candidate.model';
import {CandidatesService} from '../shared/services/candidates.service';
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  candidateStatuses: string[];

  candidates: Candidate[];

  constructor(private candidatesService: CandidatesService) {
    this.candidateStatuses = ['All', 'New', 'CV-Accepted', 'CV-Rejected', 'Accepted for interview'];
  }

  selectCandidateStatus(data) {
    if (data.value === 'All') this.dataGrid.instance.clearFilter();
    else this.dataGrid.instance.filter(['status', '=', data.value]);
  }

/*  getWeek(num) {
    return Math.ceil(num / 7);
  }

  getEnding(number) {
    return number > 1 ? 's' : '';
  }*/

  ngOnInit() {
    this.candidatesService.getCandidates()
      .subscribe(candidates => {
        this.candidates = candidates;
        for (let i = 0; i < this.candidates.length; i++) {
          if (!this.candidates[i].photo) this.candidates[i].photo = "anounymus";

     /*     let now: number = new Date().getTime() / 1000;
          let dateOfAddCandidate: number = (now - +this.candidates[i].date) / 86400;
          if (dateOfAddCandidate < 1) this.candidates[i].date = 'today';
          else if (2 < dateOfAddCandidate && 7 > dateOfAddCandidate) this.candidates[i].date = Math.ceil(dateOfAddCandidate) + ' days later';
          else if (7 < dateOfAddCandidate && 27 > dateOfAddCandidate) this.candidates[i].date = 'about ' + this.getWeek(dateOfAddCandidate) + ' week' + this.getEnding(this.getWeek(dateOfAddCandidate)) + ' later';
          else if (27 < dateOfAddCandidate) this.candidates[i].date = 'a month ago';*/
        }
      });


  }


}
