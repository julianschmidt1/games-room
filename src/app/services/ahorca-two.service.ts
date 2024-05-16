import { Injectable } from '@angular/core';
import { RevealWordModel } from '../pages/games/ahorca-two/models/reveal-word.model';
import { GameStateModel } from '../pages/games/ahorca-two/models/game-state.model';
import { SelectedKeyModel } from '../pages/games/ahorca-two/models/selected-key.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcaTwoService {

  public words: Array<string> = happyWords;
  private _selectedKeys: Array<SelectedKeyModel> = [];
  private _wordToReveal: RevealWordModel = { fullWord: '', splittedWord: [] };
  private _gameStateSubject = new BehaviorSubject({ inGame: false, triesLeft: 6, victory: false });
  public game$ = this._gameStateSubject.asObservable();

  constructor() { }

  public startNewGame(): void {
    const selectedWord = this.getRandomWord();
    this._wordToReveal.fullWord = selectedWord;
    this._wordToReveal.splittedWord = selectedWord.split('');
    this._selectedKeys = [];

    this._gameStateSubject.next({ inGame: true, triesLeft: 6, victory: false });
  }

  public getRevealedLetter(letter: string): string {
    if (this.getKeyState(letter)?.correctLetter) {
      return letter;
    }

    return '-';
  }

  private getRandomWord(): string {
    const wordIndex = Math.floor(Math.random() * this.words.length);
    return this.words[wordIndex].toUpperCase();
  }

  public addKey(key: string): void {
    const keyState = this.getKeyState(key);
    if (keyState) return;

    const correctLetter = this._wordToReveal.splittedWord.includes(key);
    this._selectedKeys = [
      ...this._selectedKeys,
      { key, correctLetter }
    ];

    let gameState: GameStateModel = this._gameStateSubject.getValue();
    if (!correctLetter) {

      if (gameState.triesLeft > 1) {
        gameState = { ...gameState, triesLeft: gameState.triesLeft - 1 };
      } else {
        gameState = { inGame: false, triesLeft: 0, victory: false };
      }

    } else {
      const correctKeys = this._selectedKeys.filter(k => k.correctLetter);
      if (this._wordToReveal.splittedWord.every(k => correctKeys.some(ck => k === ck.key))) {

        gameState = { inGame: false, victory: true, triesLeft: gameState.triesLeft }
      }
    }

    this._gameStateSubject.next(gameState);
  }

  public endCurrentGame(): void {
    this._gameStateSubject.next({ inGame: false, triesLeft: 6, victory: false });
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
}

const happyWords = [
  "Amor",
  "Felicidad",
  "Sonrisa",
  "Paz",
  "Alegria",
  "Esperanza",
  "Bondad",
  "Gratitud",
  "Armonia",
  "Amistad",
  "Optimismo",
  "Sinceridad",
  "Risas",
  "Compasion",
  "Ternura",
  "Abrazo",
  "Risueño",
  "Bendicion",
  "Serenidad",
  "Dulzura",
  "Encanto",
  "Exito",
  "Generosidad",
  "Agradecimiento",
  "Plenitud",
  "Libertad",
  "Admiracion",
  "Maravilla",
  "Encantamiento",
  "Solidaridad",
  "Confianza",
  "Vitalidad",
  "Esplendor",
  "Resplandor",
  "Inspiracion",
  "Extasis",
  "Fascinacion",
  "Entusiasmo",
  "Esperanza"
];