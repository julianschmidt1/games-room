import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public userName: string = '';
  public password: string = '';
  private _routerService = inject(Router);
  private _toastService = inject(MessageService);

  public setAdminCredentials(): void {
    this.userName = 'admin@mail.com';
    this.password = 'admin';
  }

  public handleLogin(): void {
    if (this.userName.length > 5 && this.password.length >= 5) {
      this._routerService.navigateByUrl('home');
    } else {
      this._toastService.add({ severity: 'error', summary: 'Error', detail: 'El usuario ingresado no existe' });
    }
  }
}
