import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AhorcaTwoService {

  public words: string[] = ["Tabata", "Reiki", "Falopa"];
  
  constructor() { }

  public getWord(): string {
    return this.words[2].toUpperCase();
  }

}
