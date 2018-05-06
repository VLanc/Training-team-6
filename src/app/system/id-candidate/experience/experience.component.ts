import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  @Output('onSaveRejected') saveRejected = new EventEmitter<>();
  @Output('onSaveAccepted') saveAccepted = new EventEmitter<>();
  @Output('onDeleteExperience') deleteExperienceEmitter = new EventEmitter<number>();
  @Input() editing: boolean;
  @Input() quantityExperiences: any;
  @Input() singleExperience: {
    id: number,
    timeStart: string,
    timeEnd: string,
    job: number,
    position: string,
    place: string,
    company: string,
    responsibility: string
  };

  private editingExperience: boolean = false;
  experienceForm: FormGroup;



  constructor() {
    // console.log('component CANDIDATE');
  }

  editExperience(id: number) {
    this.editingExperience = true;
    this.saveRejected.emit();
    this.experienceForm = new FormGroup({
          'timeStart': new FormControl(this.singleExperience.timeStart, [Validators.required, Validators.minLength(3)]),
          'timeEnd': new FormControl(this.singleExperience.timeEnd, [Validators.required, Validators.minLength(3)]),
          'job': new FormControl(this.singleExperience.job, [Validators.required, Validators.min(1), Validators.max(2)]),
          'position': new FormControl(this.singleExperience.position, [Validators.required, Validators.minLength(5)]),
          'place': new FormControl(this.singleExperience.place, [Validators.required, Validators.minLength(2)]),
          'company': new FormControl(this.singleExperience.company, [Validators.required, Validators.minLength(2)]),
          'responsibility': new FormControl(this.singleExperience.responsibility, [Validators.required, Validators.minLength(2)])
        });
  }

  saveExperience(id: number) {
    this.editingExperience = false;
    this.saveAccepted.emit();
  }

  deleteExperience(id: number) {
    if (this.editingExperience === true) {
      this.saveAccepted.emit();
    }
      this.deleteExperienceEmitter.emit(id);
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


