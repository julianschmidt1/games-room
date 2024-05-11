import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/chat.component';

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
  public gamesList: Array<GameModel> = [
    { name: 'Ahorcado', },
    { name: 'Pregunta2', },
    { name: 'Diablo II', },
  ]
}

interface GameModel {
  name: string
}
