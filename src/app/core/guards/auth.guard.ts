import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../features/auth/auth.facade';

export const authGuard = async () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  console.log('Se llegó al Auth Guard');


  while (authFacade.isCheckingAuth()) {
    console.log('Estoy en el while del Auth Guard');
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  const isAuthenticated = authFacade.isAuthenticated();
  if (isAuthenticated) {
    console.log('Estoy en el if (caso true) del Auth Guard');
    return true;
  } else {
    console.log('Estoy en el if (caso false) del Auth Guard');
    router.navigate(['/auth/login']);
    return false;
  }
};
