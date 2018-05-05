import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  @Output('saveRejected') saveRejected = new EventEmitter<boolean>();
  @Output('saveAccepted') saveAccepted = new EventEmitter<boolean>();
  @Input() editing: boolean;
  @Input() candidate: any;
  @Input() quantityExperiences: any;
  @Input() singleExperience: {
    id: number,
    timeStart: string,
    timeEnd: string,
    job: boolean,
    position: string,
    place: string,
    company: string,
    responsibility: string
  };

  editingExperience: boolean = false;
  experienceForm: FormGroup;



  constructor() {
    // console.log('component CANDIDATE');
  }

  editExperience(id: number) {
    this.editingExperience = true;
    this.saveRejected.emit(!this.editingExperience);
    this.experienceForm = new FormGroup({
          'timeStart': new FormControl(this.singleExperience.timeStart, [Validators.required]),
          'timeEnd': new FormControl(this.singleExperience.timeEnd, [Validators.required]),
          'position': new FormControl(this.singleExperience.position, [Validators.required]),
          'place': new FormControl(this.singleExperience.place, [Validators.required]),
          'company': new FormControl(this.singleExperience.company, [Validators.required]),
          'responsibility': new FormControl(this.singleExperience.responsibility, [Validators.required])
        });

    // console.log('edit' + id);
    // console.log(this.experienceForm);

  }

  saveExperience(id: number) {
    this.editingExperience = false;
    this.saveAccepted.emit(!this.editingExperience);
    // console.log('save' + id)
  }

  deleteExperience(id: number) {
    this.editingExperience = false;
    this.saveAccepted.emit(!this.editingExperience);
    // console.log('delete' + id)
  }

  // ngOnInit() {
   //  this.experience.map(() => {
   //   this.experienceForms[this.experience.id] = new FormGroup({
   //     'time': new FormControl(this.experience.time, [Validators.required])
   //   //
   //   });
   //   console.log(this.experienceForms);
   // });


    //   this.experience.forEach( (experienceUnit) => {
    //
    //   this.experienceForms[experienceUnit.id - 1] = new FormGroup({
    //     'timeStart': new FormControl(experienceUnit.timeStart, [Validators.required]),
    //     'timeEnd': new FormControl(experienceUnit.timeEnd, [Validators.required]),
    //     'position': new FormControl(experienceUnit.position, [Validators.required]),
    //     'place': new FormControl(experienceUnit.place, [Validators.required]),
    //     'company': new FormControl(experienceUnit.company, [Validators.required]),
    //     'responsibility': new FormControl(experienceUnit.responsibility, [Validators.required])
    //   });
    // });
    // console.log(this.experienceForms);







        // }





}


