import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../../features/auth/auth.facade';
import { UserSubmenuComponent } from '../user-submenu/user-submenu.component';
import { UserRoles as R } from '../../../core/enums';

@Component({
  selector: 'app-header-dashboard',
  imports: [RouterLink, UserSubmenuComponent],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDashboardComponent {
  private authFacade = inject(AuthFacade);
  readonly user = this.authFacade.user;
  
  readonly title =
  this.user()?.rol === R.PATIENT
    ? 'Portal para Pacientes'
    : 'Portal para Especialistas';
}
