import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CountryModel } from '../pages/games/triviasco/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class TriviascoService {

  private _httpClient: HttpClient = inject(HttpClient);

  private _gameStateSubject = new BehaviorSubject(initialGameData);
  public game$ = this._gameStateSubject.asObservable();

  constructor() { }

  public startNewGame(): void {
    // const selectedWord = this.g();
    // this._wordToReveal.fullWord = selectedWord;
    // this._wordToReveal.splittedWord = selectedWord.split('');
    // this._selectedKeys = [];

    // this._gameStateSubject.next({ inGame: true, triesLeft: 6, victory: false, totalScore: 0 });
  }

  public getCountries(): Observable<Array<CountryModel>> {
    return this._httpClient.get('https://restcountries.com/v3.1/subregion/South America')
      .pipe(
        map((data: any) => this.parseCountriesData(data))
      );
  }

  private parseCountriesData(data: any): Array<CountryModel> {
    return data.map((country: any) => (
      {
        name: country.translations.spa.common,
        flag: country.flags.png
      }
    ))
  }

  public pickRandomCountry(countries: any) {
    const countryIndex = Math.floor(Math.random() * countries.length);
    const selectedCountry = countries.splice(countryIndex, 1).find((c: any) => c);
    return selectedCountry
  }

}

const initialGameData = {
  inGame: false,
  triesLeft: 10,
  victory: false,
  totalScore: 0,
}

