import { Component, OnDestroy, inject } from '@angular/core';
import { MajorMinorService } from '../../../services/major-minor.service';
import { CardModel } from './models/card.model';

@Component({
  selector: 'app-major-minor',
  templateUrl: './major-minor.component.html',
  styleUrl: './major-minor.component.scss'
})
export class MajorMinorComponent implements OnDestroy {

  public _majorMinorService = inject(MajorMinorService);
  public triesLeft: Array<number> = [];
  public currentCard!: CardModel;
  public currentGame: any;

  constructor() {
    this._majorMinorService.generateInitialCards();
    this._majorMinorService.game$.subscribe(data => {
      let tries = [];
      for (let i = 0; i < data.triesLeft; i++) {
        tries.push(i + 1);
      }
      this.currentGame = data;
      this.triesLeft = tries;
      console.log('GAME: ', this.currentGame)
    })
  }

  ngOnDestroy(): void {
    this._majorMinorService.endCurrentGame();
  }

  public getCurrentCardStick(currentCardStick: string): string {
    switch (currentCardStick) {
      case 'Copa':
        return '🍷';
      case 'Espada':
        return '⚔️';
      case 'Oro':
        return '🪙';
      case 'Basto':
        return '🥒';
    }
    return '';
  }

  public handleStartGame(): void {
    this._majorMinorService.startNewGame();
    this._majorMinorService.generateInitialCards();

    const newCard = this._majorMinorService.pickRandomCard();
    if (newCard) {
      this.currentCard = newCard;
    }
  }

  public getNextCard(isGreater: boolean = false): void {
    const newCard = this._majorMinorService.pickRandomCard();
    if (newCard && this._majorMinorService.cards.length) {
      this._majorMinorService.checkCard(isGreater, this.currentCard, newCard);
      this.currentCard = newCard;
    } else {

      this._majorMinorService.setVictoryStatus();
    }

  }
}
