import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { KittyClickerService } from '../../../services/kitty-clicker.service';
import { CatGameModel } from './models/cat-game.model';
import { CatShopProductModel } from './models/cat-shop-product.model';
import { CatUpgradesModel } from './models/cat-upgrades.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kitty-clicker',
  templateUrl: './kitty-clicker.component.html',
  styleUrl: './kitty-clicker.component.scss'
})
export class KittyClickerComponent implements OnInit, OnDestroy {

  private _kittyClickerService = inject(KittyClickerService);
  currentGameState: CatGameModel | undefined;
  shop: CatShopProductModel[] | undefined;
  timer: any;
  gameSubscription!: Subscription;

  ngOnInit(): void {
    this.gameSubscription = this._kittyClickerService.game$.subscribe(gameData => {
      this.currentGameState = gameData;
      this.shop = this._kittyClickerService.getShopProducts();
    });

    this.timer = setInterval(() => {
      this._kittyClickerService.handlePassiveKitties();
    }, 1000);
  }

  ngOnDestroy(): void {
    this._kittyClickerService.endCurrentGame();
    this.gameSubscription.unsubscribe();
  }

  public handleBuyUpgrade(productName: string): void {
    this._kittyClickerService.buyProduct(productName);
  }

  public handleClick(): void {
    this._kittyClickerService.handleKittyClick();
  }

  public fixDecimalValue(value: number): string {
    return value.toFixed(2);
  }

  public getProductAmount(productName: string): number {
    if (this.currentGameState) {
      return this.currentGameState.boughtUpgrades.find((product: CatUpgradesModel) => product.name === productName)?.amount || 0;
    }

    return 0;
  }
}
