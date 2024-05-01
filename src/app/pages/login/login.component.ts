import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { ToastService } from '../../services/toast-service.service';
import { ToastModule } from 'primeng/toast';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { authErrorMessage } from '../../helpers/authError.helper';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    CustomInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public user: User = {
    email: '',
    password: '',
    username: '',
  }

  private _routerService = inject(Router);
  private _toastService = inject(ToastService);
  private _auth = inject(Auth);

  public setAdminCredentials(): void {
    this.user.email = 'admin@mail.com';
    this.user.password = 'admin';
  }

  public handleLogin(): void {
    const { email, password } = this.user;

    if (!email || !password) {
      this._toastService.errorMessage('Uno de los campos esta vacio.');
      return;
    }

    signInWithEmailAndPassword(this._auth, email, password).then(loggedUser => {
      const { user } = loggedUser;
      const { displayName, email, photoURL } = user;

      localStorage.setItem('user', JSON.stringify({ username: displayName, email, photoURL }));
      this._routerService.navigateByUrl('home');
    }).catch(e => {
      const error = authErrorMessage(e.code);
      this._toastService.errorMessage(error);
      console.log(error);
    })

  }
}
