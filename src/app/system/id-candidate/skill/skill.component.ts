import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Output('saveSkills') saveSkills = new EventEmitter<string>();
  @Input() skills: string;
  @Input() candidate: string;
  @Input() editing: boolean;

  skillsArray: object;
  constructor() { }

  ngOnInit() {
    this.skillsArray = this.skills.split(";");
  }

  deleteSkill(singleSkill: string) {
    this.skills = this.skills.replace(singleSkill + ';', '');
    this.saveSkills.emit(this.skills);
    this.skillsArray = this.skills.split(";");
    console.log(this.skills);
  }

}
