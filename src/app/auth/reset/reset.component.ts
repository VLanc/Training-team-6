import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from "../../shared/models/message.model";
import {UsersServices} from "../../shared/services/users.services";
import {stringDistance} from "codelyzer/util/utils";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})

export class ResetComponent implements OnInit {

  form: FormGroup;
  message:Message;
  constructor(private userService: UsersServices) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }
  onSubmit() {
    const formData = this.form.value;
    this.userService.resetUserPassword(formData.email)
      .subscribe((res:string) => {
       if (res === 'true') {
         this.showMessage("Message send.", 'success');
       }else {
         this.showMessage("Email not found.");
       }
      });
  }
}
