import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Input() skills: string;
  skillsArray: object;

  constructor() { }

  ngOnInit() {
    console.log(this.skills);
    this.skillsArray = this.skills.split(";");
  }

}
