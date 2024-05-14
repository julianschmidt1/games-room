import { Component, OnInit, inject } from '@angular/core';
import { AhorcaTwoService } from '../../../services/ahorca-two.service';
import { RevealWordModel } from './models/reveal-word.model';
import { GameStateModel } from './models/game-state.model';

@Component({
  selector: 'ahorca-two',
  templateUrl: './ahorca-two.component.html',
  styleUrl: './ahorca-two.component.scss'
})
export class AhorcaTwoComponent implements OnInit {

  // component states
  public keyboard: string[] = [];

  // service states
  public _ahorcaTwoService = inject(AhorcaTwoService);
  public currentWord: RevealWordModel = this._ahorcaTwoService.getCurrentWord();
  public currentGameState: GameStateModel | undefined;

  constructor() {
    this.keyboard = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    console.log(this.currentWord);
  }

  ngOnInit(): void {
    this._ahorcaTwoService.game$.subscribe(gameData => {
      this.currentGameState = gameData;
      console.log(gameData);
      
    });
  }

  public handleSelectKey(key: string): void {
    this._ahorcaTwoService.addKey(key);
  }

  public getRevealedWord(letter: string): string {
    return this._ahorcaTwoService.getRevealedLetter(letter);
  }

}

