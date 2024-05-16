import { Component, inject } from '@angular/core';
import { MajorMinorService } from '../../../services/major-minor.service';
import { CardModel } from './models/card.model';

@Component({
  selector: 'app-major-minor',
  templateUrl: './major-minor.component.html',
  styleUrl: './major-minor.component.scss'
})
export class MajorMinorComponent {

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
      console.log('GAME: ',this.currentGame)
    })

    const newCard = this._majorMinorService.pickRandomCard();
    if (newCard) {
      this.currentCard = newCard;
    }

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

  public getNextCard(isGreater: boolean = false): void {
    const newCard = this._majorMinorService.pickRandomCard();
    if (newCard) {
      console.log('------------------------------------------');
      
      this._majorMinorService.checkCard(isGreater, this.currentCard, newCard);
      this.currentCard = newCard;
    } else {
      console.log('end game');
    }

  }
}
