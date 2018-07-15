import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UsersServices} from '../../shared/services/users.services';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthServeces} from '../../shared/services/auth.serveces';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  
  // TODO use toastr module to show messages.
  message: Message;

  constructor(private userService: UsersServices,
              private authService: AuthServeces,
              private router: Router,
              private route: ActivatedRoute,
              ) {

  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams
      .subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage('Now you can enter in system.', 'success');
      } else if (params['accessDenied']) {
        this.showMessage('You must loggin.', 'warning');
      }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }
  private showMessage(text: string, type: string = 'danger') {
      this.message = new Message(type, text);
      
      // TODO: use RxJs
      window.setTimeout(() => {
        this.message.text = '';
      }, 5000);
  }
  onSubmit() {
    const formData = this.form.value;
    // this.userService.getUserByEmail(formData.email)
    //   .subscribe((user: User) => {
    //     if (user) {
    //       if (user.password === formData.password) {
    //         this.message.text = '';
    //         window.localStorage.setItem('userEmail',user.email);
    //         this.authService.login();
    //         this.router.navigate(['/vacancies']);
    //
    //       } else {
    //         this.showMessage('incorrect password');
    //       }
    //
    //     } else {
    //       this.showMessage('user not found');
    //     }
    //   });
    this.userService.loginUser(formData.email, formData.password)
      .subscribe((user: User)=>{
        if (user){
          this.message.text = '';
          window.localStorage.setItem('userEmail',user.email);
          this.authService.login();
          this.router.navigate(['/vacancies']);
        } else {
          this.showMessage('email or password incorrect');
        }
      });
  }

}
