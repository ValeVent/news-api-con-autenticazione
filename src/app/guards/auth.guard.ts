import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PathsEnum } from '../app.routes';

export const authGuard: CanActivateFn = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token: string | null = authService.getToken();

  if (!token) {
    router.navigate([PathsEnum.LOGIN]);
    return false;
  }

  return true;
};
