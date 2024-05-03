import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { authErrorMessage } from '../../helpers/authError.helper';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    CustomInputComponent,
    InputTextModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './login.component.scss'
})
export class RegisterComponent {

  public email: string = '';
  public password: string = '';
  public username: string = '';

  private _auth = inject(Auth);
  private _toastService = inject(ToastService);
  private _routerService = inject(Router);
  private _loggerService = inject(LoggerService);

  public async handleRegister() {
    const newUsername = this.username.trim();
    const newEmail = this.email.trim();

    if (!newEmail || !this.password) {
      this._toastService.errorMessage('Uno de los campos esta vacio.');
      return;
    }

    if (newUsername.length < 6 || newUsername.length > 12) {
      this._toastService.errorMessage('El nombre de usuario debe tener entre 6 y 12 caracteres.');
      return;
    }

    createUserWithEmailAndPassword(this._auth, newEmail, this.password).then(() => {
      this._toastService.successMessage('Usuario registrado con éxito');

      signInWithEmailAndPassword(this._auth, newEmail, this.password).then(async (loggedUserData) => {
        const { user } = loggedUserData;
        const { email, photoURL } = user;
        await updateProfile(user, { displayName: this.username });
        
        localStorage.setItem('user', JSON.stringify({ username: this.username, email, photoURL }));
        this._loggerService.createLog(this.username, 'logins');
        this._routerService.navigateByUrl('home');
      });
    })
      .catch(e => {
        const error = authErrorMessage(e.code);
        this._toastService.errorMessage(error);
        console.log(error);
      })
  }
}
