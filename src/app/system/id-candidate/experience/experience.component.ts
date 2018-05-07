import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Experience} from '../../shared/models/experience.model';

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
  @Input() indexExperience: number;
  @Input() singleExperience: Experience;

  private editingExperience: boolean = false;
  experienceForm: FormGroup;


  constructor() {
  }

  editExperience() {
    this.editingExperience = true;
    this.saveRejected.emit();
    this.experienceForm = new FormGroup({
      'timeStart': new FormControl(this.singleExperience.timeStart, [Validators.required, Validators.minLength(3)]),
      'timeEnd': new FormControl(this.singleExperience.timeEnd, [Validators.required, Validators.minLength(3)]),
      'job': new FormControl(this.singleExperience.job, [Validators.required, Validators.min(1), Validators.max(2)]),
      'position': new FormControl(this.singleExperience.position, [Validators.required, Validators.minLength(5)]),
      'company': new FormControl(this.singleExperience.company, [Validators.required, Validators.minLength(2)]),
      'responsibility': new FormControl(this.singleExperience.responsibility, [Validators.required, Validators.minLength(2)])
    });
  }

  saveExperience() {
    this.editingExperience = false;
    this.saveAccepted.emit();
  }

  deleteExperience(id: number) {
    if (this.editingExperience === true) {
      this.saveAccepted.emit();
    }
    this.deleteExperienceEmitter.emit(id);
  }
}


