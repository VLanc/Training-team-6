import {Component, OnInit, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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
          'review': 'Хороший кандидат'
        },
        {
          'name': 'Якубович',
          'review': 'берем'
        }
      ],
      'experiences':
        [
          {
            'id': 1,
            'timeStart': 'Apr 2015',
            'timeEnd': 'Now',
            'job': 1,
            'position': 'Learn Java Developer',
            'place': "Минск",
            'company': 'Itransition Group Ltd.',
            'responsibility': 'WEB Development, wвпавпвшрь шкьрешгерьиншг кернрш гернкшгрешн ркшерншкреш кшреншкрешнрк шрнкренршкренк ршншгкренркшнр шкреншркшеншкр ешнркшеншкрешork with server side logic, take part in search engine development and optimization'
          },
          {
            'id': 2,
            'timeStart': 'Oct 2012',
            'timeEnd': 'Mar 2015',
            'job': 1,
            'position': 'Senior Java Developer',
            'place': "Минск",
            'company': 'Belhard',
            'responsibility': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
          },
          {
            'id': 3,
            'timeStart': 'Oct 2012',
            'timeEnd': 'Mar 2015',
            'job': 2,
            'position': 'STUDENT',
            'place': "Минск",
            'company': 'BSUIR',
            'responsibility': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
          },
          {
            'id': 4,
            'timeStart': 'Oct 2012',
            'timeEnd': 'Mar 2015',
            'job': 2,
            'position': 'STUDENT',
            'place': "Минск",
            'company': 'BSUIR',
            'responsibility': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
          }
        ]
    };

  quantityExperiences = this.candidate.experiences.length;
  editing: boolean = false;
  candidateForm: FormGroup;

  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private router: Router) {
  }

  saveSkills(skills: string): void {
    this.candidate.skills = skills;
    console.log(this.candidate.skills);
  }

  public getImagePath(): string {
    return this.candidate.photo ? '../../../assets/images/' + this.candidate.photo + '.png' : '../../../../assets/images/anounymus.png';

  }

  saveCandidate(): void {
    this.editing = !this.editing;
    console.log(this.candidate);
    console.log('saveCandidate');
  }

  editCandidate(): void {
    this.editing = !this.editing;
    console.log(this.editing);
    console.log(this.candidateForm);


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


  getDate(): string {
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

  saveRejected(): void {
    this.editorCount++;
  }

  saveAccepted(): void {
    this.editorCount--;
  }


  modalOpen(modalWindow): void {
    console.log('opened modal window' + modalWindow);
    this.activeModal = this.modalService.open(modalWindow, {size: 'lg'});
  }

  closeModalWindow() {
    this.clearModalWindow();
    this.activeModal.close();
  }

  clearModalWindow() {
    // this.selectedNewStartDate = new Date();
    // this.selectedEndDate = new Date();
    // this.selectedParticipants = [];
    // this.selectedInterviewers = [];
    // this.selectedLocation = '';
    // this.selectedColor = {name: 'default', code: '#3a87ad'};
    // this.selectedDescription = '';
    // this.isNewStartDateInvalid = false;
    // this.isStartDateHintVisible = false;
    // this.startDateHint = '';
    // this.isEndTimeInvalid = false;
    // this.isEndTimeHintVisible = false;
    // this.endTimeHint = '';
    // this.isParticipantsInvalid = false;
    // this.isInterviewersInvalid = false;
  }

  saveModalWindowDataExperience() {
    /*TODO save data method*/
    this.closeModalWindow();
  }

  saveModalWindowDataReview() {
    /*TODO save data method*/
    this.closeModalWindow();
  }


  deleteExperience(id: number): void {
    // delete.this.candidate.experience[id];
    console.log(id);

  }
}
