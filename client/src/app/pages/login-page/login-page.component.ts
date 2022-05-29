import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MaterialSevice } from 'src/app/shared/services/material.sevice';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginFormGroup!: FormGroup;
  registerFormGroup!: FormGroup;
  aSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private rout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    this.registerFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.rout.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialSevice.toast('Пользователь успешно создан');
      } else if (params['accessDenied']) {
        MaterialSevice.toast('Вам нужно авторизоваться в систему');
      } else if (params['sessionFailed']) {
        MaterialSevice.toast('Сессия закончилась');
      }
    });
  }

  login() {
    this.loginFormGroup.disable();
    this.aSub = this.authService.login(this.loginFormGroup.value).subscribe(
      (res) => {
        console.log(res), this.router.navigate(['/overview']);
        this.loginFormGroup.enable();
      },
      (error) => {
        console.warn(error);
        MaterialSevice.toast(error.error.message);

        this.loginFormGroup.enable();
      }
    );
    console.log(this.loginFormGroup.value);
  }
  register() {
    this.loginFormGroup.disable();
    this.aSub = this.authService
      .registration(this.registerFormGroup.value)
      .subscribe(
        (res) => {
          this.loginFormGroup.enable();
          MaterialSevice.toast(
            'Пользователь успешно создан, перейдите на вкладку Логина для входа в систему'
          ),
            {
              queryParams: {
                registered: true,
              },
            };
        },
        (error) => {
          console.warn(error);
          MaterialSevice.toast(error.error.message);
          this.loginFormGroup.enable();
        }
      );
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
