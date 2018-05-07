import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../shared/models/user.model';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-id-candidate',
  templateUrl: './id-candidate.component.html',
  styleUrls: ['./id-candidate.component.css'],
  providers: [NgbActiveModal]
})

export class IdCandidateComponent implements OnInit {
  editorCount: number = 0;
  candidate =
    {
      'id': 1,
      'date': 1521042620,
      'position': 'Java Developer',
      'status': 1,
      'name': 'Alex Korol',
      'address': 'Esenina',
      'city': 'Minsk',
      'mobileNumber': '+3755447549706',
      'homeNumber': '+375172245587',
      'email': 'Alex_Korolev@mail.ru',
      'salary': '2500$',
      'photo': '05',
      'skills': 'JavaScript;Java;C++;C#;Node.JS;Maven;JSF;JPA;SEE;5+;Lel;node;TEST;',
      'reviews': [
        {
          'name': 'Аляксандр Грыгорьевич',
          'content': 'Хороший кандидат'
        },
        {
          'name': 'Якубович',
          'content': 'берем'
        }
      ],
      'experiences':
        [
          {
            'timeStart': 'Apr 2015',
            'timeEnd': 'Now',
            'job': 1,
            'position': 'Learn Java Developer',
            'company': 'Itransition Group Ltd.',
            'responsibility': 'WEB Development, wвпавпвшрь шкьрешгерьиншг кернрш гернкшгрешн ркшерншкреш кшреншкрешнрк шрнкренршкренк ршншгкренркшнр шкреншркшеншкр ешнркшеншкрешork with server side logic, take part in search engine development and optimization'
          },
          {
            'timeStart': 'Oct 2012',
            'timeEnd': 'Mar 2015',
            'job': 1,
            'position': 'Senior Java Developer',
            'company': 'Belhard',
            'responsibility': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
          },
          {
            'timeStart': 'Oct 2012',
            'timeEnd': 'Mar 2015',
            'job': 2,
            'position': 'STUDENT',
            'company': 'BSUIR',
            'responsibility': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
          },
          {
            'timeStart': 'Oct 2012',
            'timeEnd': 'Mar 2015',
            'job': 2,
            'position': 'STUDENT',
            'company': 'BSUIR',
            'responsibility': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
          }
        ]
    };

  quantityExperiences = this.candidate.experiences.length;
  editing: boolean = false;
  candidateForm: FormGroup;
  newExperienceForm: FormGroup;
  newReviewForm: FormGroup;
  user: User = JSON.parse(window.localStorage.getItem('user'));
  tabReviews: string = 'tab';

  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private router: Router) {
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
  }

  editCandidate(): void {
    this.editing = !this.editing;
  }

  deleteExperience(id: number): void {
    delete this.candidate.experiences.splice(id, 1);
    this.quantityExperiences = this.candidate.experiences.length;
  }

  saveRejected(): void {
    this.editorCount++;
  }

  saveAccepted(): void {
    this.editorCount--;
  }

  ngOnInit() {
    console.log(this.router.url);
    this.candidateForm = new FormGroup({
      'position': new FormControl(this.candidate.position, [Validators.required]),
      'status': new FormControl(this.candidate.status, [Validators.required]),
      'name': new FormControl(this.candidate.name, [Validators.required]),
      'address': new FormControl(this.candidate.address, [Validators.required]),
      'city': new FormControl(this.candidate.city, [Validators.required]),
      'mobileNumber': new FormControl(this.candidate.mobileNumber, [Validators.required]),
      'email': new FormControl(this.candidate.email, [Validators.email]),
      'salary': new FormControl(this.candidate.salary, [Validators.required])
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
