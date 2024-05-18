import { CatUpgradesModel } from "./cat-upgrades.model";

export interface CatGameModel {
    collectedCats: number,
    boughtUpgrades: CatUpgradesModel[],
    cps: number,
    clickMultiplier: number,
  }