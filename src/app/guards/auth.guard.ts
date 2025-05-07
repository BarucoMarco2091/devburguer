import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn || router.createUrlTree(['/login']); // Redireciona se não estiver logado
  }
  
  return router.createUrlTree(['/login']); // Assume "não logado" no servidor
};
