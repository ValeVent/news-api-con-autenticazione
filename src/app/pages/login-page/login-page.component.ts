import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILoginInfo } from '../../../models/auth.model';
import { Router } from '@angular/router';
import { PathsEnum } from '../../app.routes';

interface ILoginForm {
 email: FormControl<string>;
 password: FormControl<string>;
}

@Component({
 selector: 'app-login-page',
 standalone: true,
 imports: [ReactiveFormsModule],
 templateUrl: './login-page.component.html',
 styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
loginForm: FormGroup<ILoginForm> = new FormGroup<ILoginForm>({
 email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
 password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
});

constructor(private authService: AuthService, private router: Router){}
onLogin(): void {
  console.log(this.loginForm.value);
  this.authService.login(this.loginForm.value as unknown as ILoginInfo).subscribe((res) => {
    this.authService.setToken(res.accessToken);
    this.router.navigate([PathsEnum.NEWS]);
  });
}

}
