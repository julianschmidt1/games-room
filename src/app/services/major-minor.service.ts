import { Injectable } from '@angular/core';
import { CardModel } from '../pages/games/major-minor/models/card.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MajorMinorService {

  public cards: Array<CardModel> = [];
  private _gameStateSubject = new BehaviorSubject(initialGameData);
  public game$ = this._gameStateSubject.asObservable();

  constructor() { }

  public generateInitialCards() {
    this.cards = sticks.flatMap(stick => {
      let cardsByStick: Array<CardModel> = [];
      for (let i = 0; i < 12; i++) {
        cardsByStick = [
          ...cardsByStick,
          { number: i + 1, stick }
        ];
      }
      return cardsByStick;
    });
  }

  public startNewGame(): void {
    this._gameStateSubject.next({ ...initialGameData, inGame: true });
  }

  public endCurrentGame(): void {
    this._gameStateSubject.next(initialGameData);
  }

  public setVictoryStatus(): void {
    const currentGameState = this._gameStateSubject.getValue();
    this._gameStateSubject.next({ ...currentGameState, victory: true });
  }

  public checkCard(isGreater: boolean, currentCard: CardModel, newCard: CardModel): void {
    const currentGameState = this._gameStateSubject.getValue();
    const isGreaterAndConditionFulfilled = isGreater && newCard.number > currentCard.number;
    const isLesserAndConditionFulfilled = !isGreater && newCard.number < currentCard.number;
    const equalNumber = newCard.number === currentCard.number;

    if (isGreaterAndConditionFulfilled || isLesserAndConditionFulfilled) {
      this._gameStateSubject.next({ ...currentGameState, totalScore: currentGameState.totalScore + 1 });
      console.log('CORRECTO');
      console.log('Current: ', currentCard);
      console.log('newCard: ', newCard);

    } else if (!isGreaterAndConditionFulfilled && !isLesserAndConditionFulfilled && !equalNumber) {
      this._gameStateSubject.next({ ...currentGameState, triesLeft: currentGameState.triesLeft - 1 });


      console.log('INCORRECTO');
      console.log('Current: ', currentCard);
      console.log('newCard: ', newCard);

    } else {
      console.log('Es igual, no cumple nada :{');
    }

  }

  public pickRandomCard(): CardModel | undefined {
    const cardIndex = Math.floor(Math.random() * this.cards.length);
    const card = this.cards.splice(cardIndex, 1).find(card => card);
    return card;
  }
}

const sticks = [
  'Basto',
  'Espada',
  'Copa',
  'Oro',
]

const initialGameData = {
  inGame: false,
  triesLeft: 10,
  victory: false,
  totalScore: 0,
}