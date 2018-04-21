import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

import {Message} from "../../shared/models/message.model";
import {UsersServices} from "../../shared/services/users.services";
import {User} from "../../shared/models/user.model";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  message:Message;

  constructor(private userService: UsersServices,
              private router: Router) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const {email, password} = this.form.value;
    const user = new User(email, password);
    this.userService.createNewUser(user)
      .subscribe((user: User) => {
          this.router.navigate(['/login'], {
            queryParams: {
              nowCanLogin: true
            }
          });
      })
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user : User) => {
          if (user)
          {
            resolve({forbiddenEmail: true})
          } else {
            resolve(null);
          }
        })
    }))
  }

}
