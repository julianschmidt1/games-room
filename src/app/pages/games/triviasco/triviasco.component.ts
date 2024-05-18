import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TriviascoService } from '../../../services/triviasco.service';
import { CountryModel } from './models/country.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GameStateModel } from '../ahorca-two/models/game-state.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-triviasco',
  templateUrl: './triviasco.component.html',
  styleUrl: './triviasco.component.scss'
})
export class TriviascoComponent implements OnInit, OnDestroy {

  private _triviascoService = inject(TriviascoService);
  private _toastService = inject(ToastService);
  public currentGameState: GameStateModel | undefined;

  public remainingCountries: CountryModel[] = [];
  public allCountries: CountryModel[] = [];

  public selectedCountry!: CountryModel;
  public countryOptions: CountryModel[] = [];
  public triesLeft: Array<number> = [];


  ngOnInit(): void {
    this._triviascoService.getCountries().subscribe({
      next: (countriesData: CountryModel[]) => {
        this.allCountries = [...countriesData];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this._toastService.errorMessage('Ocurrio un error al cargar el juego.')
      }
    })

    this._triviascoService.game$.subscribe(gameState => {
      console.log(gameState);
      this.currentGameState = gameState;
      let tries = [];
      for (let i = 0; i < gameState.triesLeft; i++) {
        tries.push(i + 1);
      }
      this.triesLeft = tries;
    })
  }

  ngOnDestroy(): void {
    this._triviascoService.endCurrentGame();
  }

  handleSelectOption(optionCountryName: string): void {
    this._triviascoService.selectOption(this.selectedCountry, optionCountryName);
    this.setCountryAndOptions();

    if (!this.currentGameState?.triesLeft) {
      console.log('PERDISTE CHAU');
      this._triviascoService.setFinalStatus(false);
    }

    if (!this.remainingCountries.length && this.currentGameState?.triesLeft) {
      console.log('GANASTE');
      this._triviascoService.setFinalStatus(true);
    }
  }

  public handleStartGame(): void {
    this._triviascoService.startNewGame();
    this.remainingCountries = [...this.allCountries];
    this.setCountryAndOptions();
  }

  private setCountryAndOptions(): void {
    const currentCountry = this._triviascoService.pickRandomCountry(this.remainingCountries);

    if (currentCountry) {
      this.countryOptions = this._triviascoService.getRandomOptions(this.allCountries, currentCountry);
      this.selectedCountry = currentCountry;
    }
  }



}
