import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ToastService } from '../../services/toast-service.service';
import { FirebaseError } from 'firebase/app';

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

  private auth = inject(Auth);
  private toastService = inject(ToastService);

  public async handleRegister() {

    if (!this.email || !this.password) {
      this.toastService.errorMessage('Uno de los campos esta vacio.');
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(d => {
        console.log(d)
      })
      .catch(e => {

        switch (e.code) {
          case 'auth/invalid-email':
            this.toastService.errorMessage('El correo ingresado no es valido.');
            break;
          case "auth/email-already-in-use":
            this.toastService.errorMessage('El correo ingresado ya fue registrado.');
            break;
          case "auth/weak-password":
            this.toastService.errorMessage('La contraseña debe tener por lo menos 6 caracteres.');
            break;
          default:
            this.toastService.errorMessage('Ocurrio un error.');
            console.log(e);
        }
      })
  }

}
