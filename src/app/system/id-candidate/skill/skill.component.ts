import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Output('onSaveRejected') saveRejected = new EventEmitter<>();
  @Output('onSaveAccepted') saveAccepted = new EventEmitter<>();
  @Output('onSaveSkills') saveSkillsEmitter = new EventEmitter<string>();
  @Input() skills: string;
  @Input() editing: boolean;

  skillsArray: object;
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
    console.log('нажато добавление навыка');
    this.saveRejected.emit();
    this.editingSkill = true;
    this.skillForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(1)])
      });
    console.log(this.skillForm);
  }
/* TODO не помешает кнопка удаления незаполненного нового навыка*/
  saveSkill() {
    const skill = this.skillForm.value.name;
    this.editingSkill = false;
    this.saveAccepted.emit();
    this.skills = this.skills + skill + ';';
    this.saveSkillsEmitter.emit(this.skills);
    this.skillsArray = this.skills.split(';');
    this.skillsArray.splice(this.skillsArray.length-1, 1);
  }
}
