import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CatUpgradesModel } from '../pages/games/kitty-clicker/models/cat-upgrades.model';
import { CatGameModel } from '../pages/games/kitty-clicker/models/cat-game.model';
import { CatShopProductModel } from '../pages/games/kitty-clicker/models/cat-shop-product.model';

@Injectable({
  providedIn: 'root'
})
export class KittyClickerService {

  private _gameStateSubject = new BehaviorSubject(initialGameState);
  public game$ = this._gameStateSubject.asObservable();

  constructor() { }

  handleKittyClick() {
    this.setCollectedCats(1 * this.clickMultiplier);
  }

  handlePassiveKitties() {
    this.setCollectedCats(1 * this.cps);
  }

  getShopProducts(): any {
    return SHOP_PRODUCTS;
  }

  buyProduct(name: string): void {
    const product = SHOP_PRODUCTS.find(p => p.name === name);
    const currentGameState = this._gameStateSubject.getValue();

    if (product && product.price <= this.cats) {
      const { boughtUpgrades, cps, clickMultiplier } = currentGameState;
      const existingUpgrade = boughtUpgrades.find(u => u.name === name);
      this.setCollectedCats(-product.price);

      if (existingUpgrade) {

        this.setUpgrades([
          ...boughtUpgrades.filter(u => u.name !== name),
          { ...existingUpgrade, amount: existingUpgrade.amount + 1 }
        ]);

      } else {
        this.setUpgrades([
          ...boughtUpgrades,
          { name: product.name, amount: 1 }
        ]);
      }

      if (product.cps) {
        this.setCPS(cps + product.cps);
      }

      if (product.clickMultiplier) {
        this.setClickMultiplier(clickMultiplier + product.clickMultiplier)
      }
    } else {
      console.log('No te alcanza');
    }
  }

  endCurrentGame():void{
    this._gameStateSubject.next(initialGameState);
  }

  setCollectedCats(amount: number): void {
    const currentGameState = this._gameStateSubject.getValue();
    this._gameStateSubject.next({ ...currentGameState, collectedCats: currentGameState.collectedCats + amount });
  }

  setUpgrades(upgrades: CatUpgradesModel[]): void {
    const currentGameState = this._gameStateSubject.getValue();
    this._gameStateSubject.next({ ...currentGameState, boughtUpgrades: upgrades });
  }

  setCPS(value: number): void {
    const currentGameState = this._gameStateSubject.getValue();
    this._gameStateSubject.next({ ...currentGameState, cps: value });
  }

  setClickMultiplier(value: number): void {
    const currentGameState = this._gameStateSubject.getValue();
    this._gameStateSubject.next({ ...currentGameState, clickMultiplier: value });
  }

  get cats(): number {
    const currentGameState = this._gameStateSubject.getValue();
    return currentGameState.collectedCats;
  }

  get cps(): number {
    const currentGameState = this._gameStateSubject.getValue();
    return currentGameState.cps;
  }

  get clickMultiplier(): number {
    const currentGameState = this._gameStateSubject.getValue();
    return currentGameState.clickMultiplier;
  }
}

const initialGameState: CatGameModel = {
  collectedCats: 0,
  boughtUpgrades: [],
  cps: 0,
  clickMultiplier: 1,
}

const SHOP_PRODUCTS: CatShopProductModel[] = [
  { name: 'Lombriz', price: 2.5, clickMultiplier: 0.1, icon: '🪱' },
  { name: 'Cucaracha', price: 5, clickMultiplier: 0.4, icon: '🪳' },
  { name: 'Raton', price: 10, clickMultiplier: 0.8, icon: '🐭' },
  { name: 'Pajaro', price: 20, clickMultiplier: 1.4, icon: '🐦' },
  { name: 'Gato Trabajador (Negro)', price: 1000, cps: 20, icon: '🐈‍⬛' },
  { name: 'Pollito', price: 30, clickMultiplier: 2, icon: '🐥' },
  { name: 'Pollo', price: 60, clickMultiplier: 5, icon: '🍗' },
  { name: 'Gallina', price: 100, clickMultiplier: 10, icon: '🐔' },
  { name: 'Panceta', price: 1000, clickMultiplier: 200, icon: '🥓' },
  { name: 'Gato Trabajador (Naranja)', price: 10500, cps: 100, icon: '🐈' },
]
