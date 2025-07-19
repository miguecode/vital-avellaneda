import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../../features/auth/auth.facade';
import { UserSubmenuComponent } from '../user-submenu/user-submenu.component';
import { UserRoles as R } from '../../../core/enums';
import { SvgIconComponent } from "../../icons/svg-icon.component";
import { ROLE_LABELS } from '../../../core/enums/enum-labels';

@Component({
  selector: 'app-header-dashboard',
  imports: [RouterLink, UserSubmenuComponent, SvgIconComponent],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDashboardComponent {
  private authFacade = inject(AuthFacade);
  readonly user = this.authFacade.user;
  
  get roleLabel(): string {
    const role = this.user()?.role;
    return role ? ROLE_LABELS.get(role) ?? role : '';
  }

  get title(): string {
    const role = this.user()?.role;
    if (!role) return '';
    const label = ROLE_LABELS.get(role) ?? '';
    return `Portal para ${label ? label + 's' : ''}`;
  }

  get userRoleIcon(): 'user' | 'patient' | 'specialist' {
    const role = this.user()?.role;
    if (role === R.PATIENT) return 'patient';
    if (role === R.SPECIALIST) return 'specialist';
    return 'user';
  }
}
