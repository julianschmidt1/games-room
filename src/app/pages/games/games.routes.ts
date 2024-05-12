import { Routes } from '@angular/router';

export const gamesRoutes: Routes = [
    { path: 'ahorcatwo', loadChildren: () => import('../games/ahorca-two/ahorca-two.module').then(d => d.AhorcaTwoModule) },
    { path: 'majorminor', loadChildren: () => import('../games/major-minor/major-minor.module').then(d => d.MajorMinorModule) }
];
