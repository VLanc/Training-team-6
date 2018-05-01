import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';


import {Experience} from '../../../shared/models/experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  // experience: Experience;
  public experience = [
    {
      'id': 1,
      'timeStart': 'Apr 2015',
      'timeEnd': 'Now',
      'position': 'Learn Java Developer',
      'place': "Минск",
      'company': 'Itransition Group Ltd.',
      'responsibility': 'WEB Development, wвпавпвшрь шкьрешгерьиншг кернрш гернкшгрешн ркшерншкреш кшреншкрешнрк шрнкренршкренк ршншгкренркшнр шкреншркшеншкр ешнркшеншкрешork with server side logic, take part in search engine development and optimization'
    },
    {
      'id': 2,
      'timeStart': 'Oct 2012',
      'timeEnd': 'Mar 2015',
      'position': 'Senior Java Developer',
      'place': "Минск",
      'company': 'Belhard',
      'responsibility': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
    }
  ];

  education: object = [
    {
      'id': 1,
      'timeStart': 'Oct 2012',
      'timeEnd': 'Mar 2015',
      'position': 'STUDENT',
      'place': "Минск",
      'company': 'BSUIR',
      'responsibility': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
    },
    {
      'id': 2,
      'timeStart': 'Oct 2012',
      'timeEnd': 'Mar 2015',
      'position': 'STUDENT',
      'place': "Минск",
      'company': 'BSUIR',
      'responsibility': 'Design, build, and maintain efficient, reusable, and reliable Java code.'
    }
  ];

  experienceForms: any = [];
  // educationForms : FormGroup;



  constructor() {
    console.log('component CANDIDATE');
  }

  ngOnInit() {
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







        }





}

      //   "userName": new FormControl("Tom", Validators.required),
      //   "userEmail": new FormControl("", [
      //     Validators.required,
      //     Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")
      //   ]),
      //   "userPhone": new FormControl()
      // });


