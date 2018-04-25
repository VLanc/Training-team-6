import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit {
  form: FormGroup;
  user: User;
  private textForEmptyField = 'You haven\`t filled this field yet';
  private textErrorForNames = 'field is empty or less than two characters';
  private textErrorForRole = 'field is empty or less than two characters';
  private textErrorForEmail = 'field is empty or is not email';
  private editing = true;


  constructor() {
  }

  editProfile(): void {
    this.editing = false;
  }


  saveProfile(): void {
    this.processingRole();
    for (const field in this.user) {
      if (this.user.hasOwnProperty(field) && this.user[field]) {
        this.user[field].trim();
      }
    }
    window.localStorage.setItem('user', JSON.stringify(this.user));
  }

  onSubmit(): void {
    this.saveProfile();
    this.editing = true;
  }

  processingRole() {
    /*TODO this is a hardcode*/
    if (this.user.roleIndex === '1') {
      return 'developer';
    } else {
      return 'manager';
    }
    /*END of hardcode*/
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.processingRole();
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'surname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'roleIndex': new FormControl(null, [Validators.required, Validators.minLength(1)]),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
// >>>>>>> 563fe1275cac8c098d170352210ccda1103371cc
  }
}


