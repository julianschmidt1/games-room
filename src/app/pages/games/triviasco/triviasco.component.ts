import { Component, OnInit, inject } from '@angular/core';
import { TriviascoService } from '../../../services/triviasco.service';
import { CountryModel } from './models/country.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GameStateModel } from '../ahorca-two/models/game-state.model';

@Component({
  selector: 'app-triviasco',
  templateUrl: './triviasco.component.html',
  styleUrl: './triviasco.component.scss'
})
export class TriviascoComponent implements OnInit {

  private _triviascoService = inject(TriviascoService);
  public countries: CountryModel[] = [];
  public selectedCountry!: CountryModel;
  public currentGameState: GameStateModel | undefined;

  ngOnInit(): void {
    this._triviascoService.getCountries().subscribe({
      next: (data: CountryModel[]) => this.countries = data,
      error: (error: HttpErrorResponse) => console.log(error)
    })

    this._triviascoService.game$.subscribe(gameState => {
      console.log(gameState);
      this.currentGameState = gameState;
    })

    console.log(this);
  }

  selectCountry() {

    const currentCountry = this._triviascoService.pickRandomCountry(this.countries);
    console.log(currentCountry);
    this.selectedCountry = currentCountry;
  }

  selectOption(countryName: string) {
    if (this.selectedCountry.name === countryName) {
      console.log('Correcto', countryName);

    }
  }

  public handleStartGame() {

  }



}
