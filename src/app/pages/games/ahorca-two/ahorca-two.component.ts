import { Component, inject } from '@angular/core';
import { AhorcaTwoService } from '../../../services/ahorca-two.service';

@Component({
  selector: 'ahorca-two',
  templateUrl: './ahorca-two.component.html',
  styleUrl: './ahorca-two.component.scss'
})
export class AhorcaTwoComponent {

  public keyboard: string[] = [];
  private _ahorcaTwoService = inject(AhorcaTwoService);
  public wordToReveal: RevealWordModel = { fullWord: '', splittedWord: [] };
  public selectedKeys: string[] = [];

  constructor() {
    this.keyboard = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    const currentWord = this._ahorcaTwoService.getWord();
    this.wordToReveal = {
      fullWord: currentWord,
      splittedWord: currentWord.split(''),
    }
    console.log(this.wordToReveal);

  }

  public handleSelectKey(key: string) {
    console.log(key);
    this.selectedKeys = [
      ...new Set([...this.selectedKeys, key])
    ];
    console.log(this.selectedKeys);
  }

  public getRevealedWord(letter: string): string {
    if(this.selectedKeys.includes(letter)){
      return letter;
    }

    return '-';
  }

}

interface RevealWordModel {
  fullWord: string,
  splittedWord: string[],
}