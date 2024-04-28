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
    userName: 'Test user',
  }

  private _routerService = inject(Router);
  private _toastService = inject(ToastService);

  public setAdminCredentials(): void {
    this.user.email = 'admin@mail.com';
    this.user.password = 'admin';
  }

  public handleLogin(): void {
    const { email, password } = this.user;

    // Validar bien los datos cuando se integre con firebase
    if (email!.length > 5 && password!.length >= 5) {
      localStorage.setItem('user', JSON.stringify(this.user));
      this._routerService.navigateByUrl('home');
    } else {
      this._toastService.errorMessage('Error al iniciar sesion');
    }
  }
}
