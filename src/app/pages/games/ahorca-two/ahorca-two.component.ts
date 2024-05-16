import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AhorcaTwoService } from '../../../services/ahorca-two.service';
import { RevealWordModel } from './models/reveal-word.model';
import { GameStateModel } from './models/game-state.model';
import { SelectedKeyModel } from './models/selected-key.model';

@Component({
  selector: 'ahorca-two',
  templateUrl: './ahorca-two.component.html',
  styleUrl: './ahorca-two.component.scss'
})
export class AhorcaTwoComponent implements OnInit, OnDestroy {

  public keyboard: string[] = [];

  public _ahorcaTwoService = inject(AhorcaTwoService);
  public currentWord: RevealWordModel = this._ahorcaTwoService.getCurrentWord();
  public currentGameState: GameStateModel | undefined;

  constructor() {
    this.keyboard = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  }

  ngOnInit(): void {
    this._ahorcaTwoService.game$.subscribe(gameData => {
      this.currentGameState = gameData;
    });
  }

  ngOnDestroy(): void {
    this._ahorcaTwoService.endCurrentGame();
  }

  public handleStartGame(): void {
    this._ahorcaTwoService.startNewGame();
  }

  public handleSelectKey(key: string): void {
    this._ahorcaTwoService.addKey(key);
  }

  public getRevealedWord(letter: string): string {
    return this._ahorcaTwoService.getRevealedLetter(letter);
  }

  public selectedLetterStyle(letter: string): string {
    const currentKeysState: Array<SelectedKeyModel> = this._ahorcaTwoService.getSelectedKeys();
    const key = currentKeysState.find(k => k.key === letter);

    return key ?
      (
        key?.correctLetter
          ? 'success'
          : 'error'
      )
      : ''
  }

}

