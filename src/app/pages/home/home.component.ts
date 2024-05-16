import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/chat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'home-screen',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    ChatComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private _router = inject(Router);
  public gamesList: Array<GameModel> = [
    { name: 'Ahorca2', path: 'ahorcatwo', image: 'ahorca-two' },
    { name: 'Mayor y Menor', path: 'majorminor', image: 'major-minor' },
    { name: 'Diablo II', path: '', image: '' },
  ];

  public handleGameNavigation(path: string) {
    this._router.navigateByUrl(`games/${path}`);
  }
}

interface GameModel {
  name: string,
  path: string,
  image: string,
}
