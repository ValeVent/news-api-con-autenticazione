import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILoginInfo } from '../../../models/auth.model';
import { Router } from '@angular/router';
import { PathsEnum } from '../../app.routes';
import { catchError, of } from 'rxjs';
import { NgIf } from '@angular/common';

interface ILoginForm {
 email: FormControl<string>;
 password: FormControl<string>;
}

@Component({
 selector: 'app-login-page',
 standalone: true,
 imports: [ReactiveFormsModule, NgIf],
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

isLoading: boolean = false; // Nuova variabile per lo stato di caricamento, la inserisco per il fenomeno di "cold start" e migliorare l'esperienza utente, facendogli capire che sta caricando qualcosa e non è bloccato.

constructor(private authService: AuthService, private router: Router){}
onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true; // Inizia il caricamento

    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value as unknown as ILoginInfo)
      .pipe(
        catchError((error) => {
          console.error('Login Error:', error);
          alert('Credenziali non valide o errore di rete. Riprova.'); 
          this.isLoading = false; // Termina il caricamento anche in caso di errore
          return of(null); // Restituisce un Observable vuoto per continuare il flusso
        })
      )
      .subscribe((res) => {
        if (res) { // Controlla se res non è null (in caso di errore, catchError restituisce null)
          this.authService.setToken(res.accessToken);
          this.router.navigate([PathsEnum.NEWS]);
        }
        this.isLoading = false; // Termina il caricamento
      });
  }

}
