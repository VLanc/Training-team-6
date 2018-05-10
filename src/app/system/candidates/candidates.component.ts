import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../shared/models/candidate.model';
import {CandidatesService} from '../shared/services/candidates.service';
import {DxDataGridComponent} from 'devextreme-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CandidatesComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  candidateStatuses: string[];

  candidates: Candidate[];

  constructor(private candidatesService: CandidatesService,
              private router: Router) {
    this.candidateStatuses = ['All', 'New', 'CV-Accepted', 'CV-Rejected', 'Accepted for interview'];
  }

  removeCandidate(removedCandidate) {
    console.log(removedCandidate);
  }

  selectCandidateStatus(data) {
    if (data.value === 'All') this.dataGrid.instance.clearFilter();
    else this.dataGrid.instance.filter(['status', '=', data.value]);
  }

  ngOnInit() {
    this.candidatesService.getCandidates()
      .subscribe(candidates => {
        this.candidates = candidates;
        for (let i = 0; i < this.candidates.length; i++) {
          if (!this.candidates[i].photo) this.candidates[i].photo = 'anounymus';
          /*convert from unix timestamp*/
          this.candidates[i].date *= 1000;
        }
      });
  }

  addNewCand() {
    this.candidatesService.addNewCandidate().subscribe(
      data => {
        let url = '/id-candidate/' + data.id;
        this.router.navigate([url]);
      }
    );
  }

}
