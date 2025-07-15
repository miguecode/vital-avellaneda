import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../features/auth/auth.facade';
import { UserRoles } from '../enums';

export const publicGuard = async () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  console.log('Se llegó al Public Guard');

  while (authFacade.isCheckingAuth()) {
    console.log('Estoy en el while del Public Guard');
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  const user = authFacade.user();
  if (!user) {
    console.log('Estoy en el if del Public Guard porque es !user');
    return true; // Allow access to public pages if not authenticated
  }

  // If already authenticated, redirect to their dashboard
  switch (user.rol) {
    case UserRoles.PATIENT:
      router.navigate(['/dashboard/patient']);
      break;
    case UserRoles.SPECIALIST:
      router.navigate(['/dashboard/specialist']);
      break;
    case UserRoles.ADMIN:
      router.navigate(['/dashboard/specialist']);
      break;
    default:
      router.navigate(['/dashboard/patient']);
  }
  return false;
}; 