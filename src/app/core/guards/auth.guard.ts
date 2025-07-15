import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../features/auth/auth.facade';

export const authGuard = async () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  while (authFacade.isCheckingAuth()) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  const isAuthenticated = authFacade.isAuthenticated();
  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
