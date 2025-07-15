import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../features/auth/auth.facade';
import { UserRoles } from '../enums';

export const roleGuard = (allowedRoles: UserRoles[]) => {
  return async () => {
    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    console.log('Se llegó al Auth Role');


    while (authFacade.isCheckingAuth()) {
      console.log('Estoy en el while del Role Guard');
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    const user = authFacade.user();
    if (!user) {
      console.log('Estoy en el if del Role Guard, porque es !user');
      router.navigate(['/auth/login']);
      return false;
    }

    if (allowedRoles.includes(user.rol)) {
      console.log('Estoy en el segundo if del Role Guard y voy a retornar true');
      return true;
    } else {
      console.log('Estoy en el segundo if del Role Guard y voy a retornar false');
      // Redirect to the corresponding dashboard according to the user's role
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
    }
  };
}; 