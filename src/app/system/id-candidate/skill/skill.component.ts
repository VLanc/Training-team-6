import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Output('onSaveRejected') saveRejected = new EventEmitter<boolean>();
  @Output('onSaveAccepted') saveAccepted = new EventEmitter<boolean>();
  @Output('onSaveSkills') saveSkillsEmitter = new EventEmitter<string>();
  @Input() skills: string;
  @Input() editing: boolean;

  skillsArray: any;
  editingSkill: boolean = false;
  skillForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.skillsArray = this.skills.split(';');
    this.skillsArray.splice(this.skillsArray.length-1, 1);
  }

  deleteSkill(singleSkill: string) {
    this.skills = this.skills.replace(singleSkill + ';', '');
    this.saveSkillsEmitter.emit(this.skills);
    this.skillsArray = this.skills.split(';');
    this.skillsArray.splice(this.skillsArray.length-1, 1);
  }

  addSkill() {
    this.saveRejected.emit(true);
    this.editingSkill = true;
    this.skillForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(1)])
      });
  }
/* TODO не помешает кнопка удаления незаполненного нового навыка*/
  saveSkill() {
    const skill = this.skillForm.value.name;
    this.editingSkill = false;
    this.saveRejected.emit(true);
    this.skills = this.skills + skill + ';';
    this.saveSkillsEmitter.emit(this.skills);
    this.skillsArray = this.skills.split(';');
    this.skillsArray.splice(this.skillsArray.length-1, 1);
  }
}
