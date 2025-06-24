import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export enum PathsEnum {
  LOGIN = 'login',
  NEWS = 'news',
  HOME = 'home'
}

export const routes: Routes = [
    {
        path: '',
        redirectTo: PathsEnum.HOME,
        pathMatch: 'full'
    },
    {
        path: PathsEnum.HOME,
        loadComponent: () => import('./pages/home-page/home-page.component').then(c => c.HomePageComponent)
    },
    {
        path: PathsEnum.NEWS,
        loadComponent: () => import('./pages/news-page/news-page.component').then(c => c.NewsPageComponent),
        canActivate: [authGuard]
    },
    {
        path: PathsEnum.LOGIN,
        loadComponent: () => import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent)
    }
];
