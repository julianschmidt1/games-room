import { Injectable } from '@angular/core';
import { RevealWordModel } from '../pages/games/ahorca-two/models/reveal-word.model';
import { GameStateModel } from '../pages/games/ahorca-two/models/game-state.model';
import { SelectedKeyModel } from '../pages/games/ahorca-two/models/selected-key.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcaTwoService {

  public words: Array<string> = ["Tabata", "Reiki", "Falopa"];
  private _selectedKeys: Array<SelectedKeyModel> = [];
  private _wordToReveal: RevealWordModel = { fullWord: '', splittedWord: [] };
  private _gameStateSubject = new BehaviorSubject({ inGame: false, triesLeft: 0 });
  public game$ = this._gameStateSubject.asObservable();

  constructor() {
    // this.wordToReveal.fullWord = wod
    this.startNewGame();
  }

  public startNewGame(): void {
    const wordIndex = 1; //random?
    const selectedWord = this.words[wordIndex].toUpperCase();
    this._wordToReveal.fullWord = selectedWord;
    this._wordToReveal.splittedWord = selectedWord.split('');

    this._gameStateSubject.next({ inGame: true, triesLeft: 6 });
  }

  public getRevealedLetter(letter: string): string {
    if (this.getKeyState(letter)?.correctLetter) {
      return letter;
    }

    return '-';
  }

  public addKey(key: string): void {
    const keyState = this.getKeyState(key);
    if (keyState) return;

    const correctLetter = this._wordToReveal.splittedWord.includes(key);

    if (!correctLetter) {
      console.log('aca');
      const currentData: GameStateModel = this._gameStateSubject.getValue();
      let newState: GameStateModel;
      if (currentData.triesLeft > 1) {
        newState = { ...currentData, triesLeft: currentData.triesLeft - 1 };
      } else {
        newState = { inGame: false, triesLeft: 0, };
      }

      this._gameStateSubject.next(newState);
    }

    this._selectedKeys = [
      ...this._selectedKeys,
      { key, correctLetter }
    ];
  }

  private getKeyState(letter: string): SelectedKeyModel | undefined {
    return this._selectedKeys.find(key => key.key === letter);
  }

  public getCurrentWord(): RevealWordModel {
    return this._wordToReveal;
  }

  public getSelectedKeys(): Array<SelectedKeyModel> {
    return this._selectedKeys;
  }

  // public getGameState(): GameStateModel {
  //   return this._gameStateSubject;
  // }
}
