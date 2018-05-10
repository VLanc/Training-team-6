import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersServices} from '../../shared/services/users.services';


@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit {
  form: FormGroup;
  user: User;
  private email;
  public textForEmptyField = 'You haven\`t filled this field yet';
  public textErrorForNames = 'field is empty or less than two characters';
  public textErrorForRole = 'field is empty or less than two characters';
  public textErrorForEmail = 'field is empty or is not email';
  public textBusyEmail = 'This email is busy';
  public editing = true;


  constructor(private userService: UsersServices) {
  }

  editProfile(): void {
    this.editing = false;
  }

  fileChange(event) {
    // let fileList: FileList = event.target.files;
    // if(fileList.length > 0) {
    //   let file: File = fileList[0];
    //   let formData:FormData = new FormData();
    //   formData.append('uploadFile', file, file.name);
    //   // this.userService.uploadUserAvatar(formData).subscribe();
    //
    // }
  }

  saveProfile(): void {
    this.processingRole();

    for (const field in this.user) {
      if (this.user.hasOwnProperty(field) && this.user[field]) {
        if (field == 'id') {

        } else {
          this.user[field].trim();
        }

      }
    }
    if (this.user.roleIndex == 2) {
      this.user.role = 'Developer';
    } else {
      this.user.role = 'Manager';
    }
    window.localStorage.setItem('user', JSON.stringify(this.user));
    this.userService.saveUserChanges(this.user).subscribe();
  }

  onSubmit(): void {
    this.saveProfile();
    this.editing = true;
  }

  processingRole() {
    if (this.user.roleIndex == 1) {
      return 'Developer';
    } else {
      return 'Manager';
    }
    /*END of hardcode*/
  }

  ngOnInit() {
    let email = window.localStorage.getItem('userEmail');
    this.userService.getUserByEmail(email)
      .subscribe(user => {
        this.user = user;
        this.email = this.user.email;
        this.processingRole();
        this.form = new FormGroup({
          'name': new FormControl(null, [Validators.required, Validators.minLength(2)], ),
          'surname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
          'roleIndex': new FormControl(null, [Validators.required, Validators.minLength(1)]),
          'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this))
        });
      });

  }

  getPrepareDataStatus(): boolean {
    let flag: boolean = true;
    if (this.user === undefined) {
      flag = false;
    }
    return flag;
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user2: User) => {
          if (user2) {
            if (this.email != user2.email) {
              resolve({forbiddenEmail: true});
            }

          } else {
            resolve(null);
          }
        });
    }));
  }
}
