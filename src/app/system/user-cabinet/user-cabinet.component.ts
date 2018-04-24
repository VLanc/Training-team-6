import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../shared/models/user.model';
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
  user: User;
  private editing = true;
  private allowedToSave = true;


  constructor() {
  }

  editProfile(): void {
    this.editing = false;
  }


  saveProfile(): void {
    for (const field in this.user) {
      if (this.user.hasOwnProperty(field) && this.user[field]) {
        this.user[field].trim();
        console.log(field + ' - ' + this.user[field]);
      }
    }
    window.localStorage.setItem('user', JSON.stringify(this.user));
  }


  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    console.log(this.user);
    console.log(this.user.name);
  }

}
