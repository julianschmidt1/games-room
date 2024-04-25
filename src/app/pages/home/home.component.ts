import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-screen',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule
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
