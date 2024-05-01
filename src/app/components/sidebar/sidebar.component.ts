import { Component, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public isVisible: boolean = false;
  public loggedUser!: User;
  public navigationOptions: SidebarNavigationItem[];
  private _router = inject(Router);
  private _auth = inject(Auth);

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedUser = JSON.parse(user);
    }
    console.log(this.loggedUser)

    this.navigationOptions = [
      { title: 'Inicio', navigateTo: '/home' },
      { title: 'Acerca de', navigateTo: '/about' },
    ]
  }

  public handleLogout(): void {
    signOut(this._auth);
    localStorage.clear();
    this._router.navigate([''], { replaceUrl: true });
  }

  get username(): string {
    return this.loggedUser.username.toUpperCase() || '';
  }
}

interface SidebarNavigationItem {
  title: string,
  navigateTo: string
}