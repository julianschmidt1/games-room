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

  public startNewGame(): void {
    this._gameStateSubject.next({ ...initialGameData, inGame: true });
  }

  public getCountries(): Observable<CountryModel[]> {
    return this._httpClient.get('https://restcountries.com/v3.1/subregion/South America')
      .pipe(
        map((data: any) => this.parseCountriesData(data))
      );
  }

  private parseCountriesData(data: any[]): CountryModel[] {
    return data.map((country: any) => (
      {
        name: this.handleArgentinianEggs(country.translations.spa.common),
        flag: country.flags.png
      }
    ))
  }

  public endCurrentGame(): void {
    this._gameStateSubject.next(initialGameData);
  }

  private handleArgentinianEggs(name: string) {
    if (name === 'Islas Malvinas') {
      return 'Argentina';
    }

    return name;
  }

  public pickRandomCountry(countries: CountryModel[]) {
    const countryIndex = Math.floor(Math.random() * countries.length);
    const selectedCountry = countries.splice(countryIndex, 1).find((c: CountryModel) => c);
    return selectedCountry;
  }

  public getRandomOptions(countries: CountryModel[], countryToSkip: CountryModel): any {
    const shuffledCountries = this.shuffleCountries(countries.filter((country) => country.name !== countryToSkip.name));

    const newOptions = [...shuffledCountries.slice(0, 3), countryToSkip];
    return this.shuffleCountries(newOptions);
  }

  public selectOption(currentCountry: CountryModel, selectedCountryName: string) {
    const currentGameState = this._gameStateSubject.getValue();
    if (currentCountry.name === selectedCountryName) {
      console.log('Correcto', selectedCountryName);

      this._gameStateSubject.next({ ...currentGameState, totalScore: currentGameState.totalScore + 1 });

    } else {
      console.log('Incorrecto', selectedCountryName);
      this._gameStateSubject.next({ ...currentGameState, triesLeft: currentGameState.triesLeft - 1 });

    }
  }

  private shuffleCountries(countries: CountryModel[]): CountryModel[] {
    return countries.sort(() => Math.random() - 0.5);
  }

  public setFinalStatus(victory: boolean) {
    const currentGameState = this._gameStateSubject.getValue();
    this._gameStateSubject.next({ ...currentGameState, victory });
  }

}

const initialGameData = {
  inGame: false,
  triesLeft: 3,
  victory: false,
  totalScore: 0,
}

