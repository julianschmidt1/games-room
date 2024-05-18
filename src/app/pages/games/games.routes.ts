import { Routes } from '@angular/router';

export const gamesRoutes: Routes = [
    { path: 'ahorcatwo', loadChildren: () => import('../games/ahorca-two/ahorca-two.module').then(d => d.AhorcaTwoModule) },
    { path: 'majorminor', loadChildren: () => import('../games/major-minor/major-minor.module').then(d => d.MajorMinorModule) },
    { path: 'triviasco', loadChildren: () => import('../games/triviasco/triviasco.module').then(d => d.TriviascoModule) },
    { path: 'kittyclicker', loadChildren: () => import('../games/kitty-clicker/kitty-clicker.module').then(d => d.KittyClickerModule) }
];
