import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
// import {FormGroup, Validators} from '@angular/forms';
// import {Message} from '../../shared/models/message.model';


@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit {
  // message: Message;
  form: FormGroup;
  userObject: object;
  private userObject: object;
   naqqme = 'skфывфывфывфывфывфвыфdfjsljdf';
  private editing = true;
  private allowedToSave = true;


  constructor() {
  }

  editProfile(): void {
    this.editing = false;
  }


  saveProfile(): void {
    for (const field in this.userObject) {
      if (this.userObject.hasOwnProperty(field) && this.userObject[field]) {
        this.userObject[field].trim();
        console.log(field + ' - ' + this.userObject[field]);
      }
    }
    window.localStorage.setItem('user', JSON.stringify(this.userObject));
  }


  ngOnInit() {
    this.userObject = JSON.parse(window.localStorage.getItem('user'));

  }

}
