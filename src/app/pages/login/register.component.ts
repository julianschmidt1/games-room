import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { ToastService } from '../../services/toast-service.service';
import { Router } from '@angular/router';

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

  private auth = inject(Auth);
  private _toastService = inject(ToastService);
  private _routerService = inject(Router);

  public async handleRegister() {
    const newUsername = this.username.trim();

    if (!this.email || !this.password) {
      this._toastService.errorMessage('Uno de los campos esta vacio.');
      return;
    }

    if (newUsername.length < 6 || newUsername.length > 12) {
      this._toastService.errorMessage('El nombre de usuario debe tener por lo menos 6 caracteres.');
    }

    createUserWithEmailAndPassword(this.auth, this.email, this.password).then(() => {
      this._toastService.successMessage('Usuario registrado con éxito');

      signInWithEmailAndPassword(this.auth, this.email, this.password).then(async (loggedUserData) => {
        const { user } = loggedUserData;
        const { email, photoURL } = user;
        await updateProfile(user, { displayName: this.username });

        localStorage.setItem('user', JSON.stringify({ username: this.username, email, photoURL }));
        this._routerService.navigateByUrl('home');
      });
    })
      .catch(e => {
        switch (e.code) {
          case 'auth/invalid-email':
            this._toastService.errorMessage('El correo ingresado no es valido.');
            break;
          case "auth/email-already-in-use":
            this._toastService.errorMessage('El correo ingresado ya fue registrado.');
            break;
          case "auth/weak-password":
            this._toastService.errorMessage('La contraseña debe tener por lo menos 6 caracteres.');
            break;
          default:
            this._toastService.errorMessage('Ocurrio un error.');
            console.log(e);
        }
      })
  }
}
