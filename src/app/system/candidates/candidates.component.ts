import { Component, OnInit } from '@angular/core';
import {Candidate} from '../shared/models/candidate.model';
import {CandidatesService} from '../shared/services/candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  candidates: Candidate[];
  constructor(private candidateservice: CandidatesService) { }

  ngOnInit() {
    this.candidateservice.getCandidates()
      .subscribe(candidates => {
        this.candidates = candidates;
        console.log(this.candidates);
      })
  }

}
