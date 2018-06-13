import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../../shared/services/login.service';
import {User} from '../../entities/user.entity';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string;
  type: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  onSubmit() {
    const data = this.form.value;
    this.loginService.getUserByEmail(data.email)
      .subscribe((users: User[]) => {
        if (users[0]) {
          if (users[0]['password'] === data.password) {
            this.authService.login(users[0]);
            this.router.navigate(['/search-form']);
          } else {
            this.showMessage('danger', 'Не верная пара логин-пароль.');
          }
        } else {
          this.showMessage('danger', 'Не верная пара логин-пароль.');
        }
      });
  }

  showMessage(type: string, message: string) {
    this.message = message;
    this.type = type;
    window.setTimeout(() => {
      this.message = '';
      this.type = '';
    }, 5000);
  }
}
