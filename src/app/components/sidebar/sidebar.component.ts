import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
export class SidebarComponent implements OnInit {
  public isVisible: boolean = true;
  public loggedUser!: User;
  public navigationOptions: SidebarNavigationItem[];

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

  ngOnInit(): void {
  }


}

interface SidebarNavigationItem {
  title: string,
  navigateTo: string
}