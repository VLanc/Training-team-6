import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../shared/models/user.model';
import {Route, Router} from "@angular/router";
import {Candidate} from "../shared/models/candidate.model";
import {CandidatesService} from "../shared/services/candidates.service";
import {UsersServices} from "../../shared/services/users.services";

@Component({
  selector: 'app-id-candidate',
  templateUrl: './id-candidate.component.html',
  styleUrls: ['./id-candidate.component.css'],
  providers: [NgbActiveModal]
})

export class IdCandidateComponent implements OnInit {
  editorCount: number = 0;
  candidate: Candidate;

  quantityExperiences: number;
  editing: boolean = false;
  candidateForm: FormGroup;
  newExperienceForm: FormGroup;
  newReviewForm: FormGroup;
  user: User;
  tabReviews: string = 'tab';

  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private router: Router,
              private candidateService: CandidatesService,
              private userService: UsersServices) {
  }

  public getImagePath(): string {
    return this.candidate.photo ? '../../../assets/images/' + this.candidate.photo + '.png' : '../../../../assets/images/anounymus.png';

  }

  public getDate(): string {
    let date: any = this.candidate.date;
    let now: any = new Date();
    now = now.getTime() as number / 1000;
    let dateOfAddUser: number = (now - date) / 86400;

    if (dateOfAddUser < 1) date = 'today';
    else if (2 < dateOfAddUser && 7 > dateOfAddUser) date = Math.ceil(dateOfAddUser) + ' days later';
    else if (7 < dateOfAddUser && 27 > dateOfAddUser) date = 'about ' + getWeek(dateOfAddUser) + ' week' + getEnding(getWeek(dateOfAddUser)) + ' later';
    else if (27 < dateOfAddUser) date = 'a month ago';

    function getWeek(num) {
      return Math.ceil(num / 7);
    }

    function getEnding(number) {
      return number > 1 ? 's' : '';
    }

    return date;
  }

  saveSkills(skills: string): void {
    this.candidate.skills = skills;
  }

  saveCandidate(): void {
    this.editing = !this.editing;
    this.candidateService.saveCandidate(this.candidate).subscribe();
  }

  editCandidate(): void {
    this.editing = !this.editing;
  }

  deleteExperience(id: number): void {
    this.candidate.experiences.splice(id, 1);
    this.quantityExperiences = this.candidate.experiences.length;
  }

  saveRejected(event): void {
    if (event) {
      this.editorCount++
    }

  }

  saveAccepted(event): void {
    if (event) {
      this.editorCount--
    }

  }

  ngOnInit() {
    this.candidateService.getCandidateFromId(this.router.url.split('/')[2])
      .subscribe(candidate => {
        this.candidate = candidate;
        this.quantityExperiences = this.candidate.experiences.length;
        this.candidateForm = new FormGroup({
          'position': new FormControl(this.candidate.position, [Validators.required]),
          'status': new FormControl(this.candidate.status, [Validators.required]),
          'name': new FormControl(this.candidate.name, [Validators.required]),
          'address': new FormControl(this.candidate.address, [Validators.required]),
          'city': new FormControl(this.candidate.city, [Validators.required]),
          'phone': new FormControl(this.candidate.phone, [Validators.required, Validators.minLength(13)]),
          'email': new FormControl(this.candidate.email, [Validators.email]),
          'salary': new FormControl(this.candidate.salary, [Validators.required])
        });
      });
    let email = window.localStorage.getItem('userEmail');
    this.userService.getUserByEmail(email)
      .subscribe(user => {
        this.user = user;
      });
  }

  openModalWindowExperience(modalWindow) {
    this.newExperienceForm = new FormGroup({
      'timeStart': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'timeEnd': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'job': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(2)]),
      'position': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'company': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'responsibility': new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
    this.activeModal = this.modalService.open(modalWindow, {size: 'lg'});
  }

  openModalWindowReview(modalWindow) {
    this.newReviewForm = new FormGroup({
      'name': new FormControl(this.user.name), /*TODO HARDCORE, need id from db*/
      'content': new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
    this.activeModal = this.modalService.open(modalWindow, {size: 'lg'});
  }

  closeModalWindow() {
    this.activeModal.close();
  }

  saveModalWindowDataExperience() {
    this.candidate.experiences.unshift({
      'timeStart': this.newExperienceForm.value.timeStart,
      'timeEnd': this.newExperienceForm.value.timeEnd,
      'job': this.newExperienceForm.value.job,
      'position': this.newExperienceForm.value.position,
      'company': this.newExperienceForm.value.company,
      'responsibility': this.newExperienceForm.value.responsibility
    });
    this.quantityExperiences = this.candidate.experiences.length;
    this.closeModalWindow();
  }

  saveModalWindowDataReview() {
    this.candidate.reviews.unshift({
      'name': this.newReviewForm.value.name,
      'content': this.newReviewForm.value.content
    });
    this.closeModalWindow();
  }

}
