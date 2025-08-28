import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../../features/auth/auth.facade';
import { UserSubmenuComponent } from '../user-submenu/user-submenu.component';
import { UserRoles as R } from '../../../core/enums';
import { SvgIconComponent } from '../../icons/svg-icon.component';
import { ROLE_LABELS } from '../../../core/enums/enum-labels';
import { APP_SHARED_INFO } from '../../../core/config/app-info';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header-dashboard',
  imports: [RouterLink, UserSubmenuComponent, SvgIconComponent, NgClass],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDashboardComponent {
  private authFacade = inject(AuthFacade);
  readonly user = this.authFacade.user;
  public isMenuOpen = signal(false);
  public isAnimating = signal(false);

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

  navItems = [
    {
      title: 'Quiénes Somos',
      ariaLabel: 'Sección sobre quiénes somos',
      href: '/info/quienes-somos',
    },
    {
      title: 'Especialidades y Servicios',
      ariaLabel: 'Sección de Especialidades y Servicios',
      href: '/info/especialidades-y-servicios',
    },
    {
      title: 'Nuestros Profesionales',
      ariaLabel: 'Sección de Nuestros Profesionales',
      href: '/info/nuestros-profesionales',
    },
    {
      title: 'Novedades',
      ariaLabel: 'Sección de Novedades',
      href: '/news',
    },
  ];

  toggleMenu() {
    if (!this.isAnimating()) {
      this.isAnimating.set(true);
    }
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  // Href
  readonly facebook = APP_SHARED_INFO.social.facebook;
  readonly instagram = APP_SHARED_INFO.social.instagram;
  readonly twitter = APP_SHARED_INFO.social.twitter;
  readonly tiktok = APP_SHARED_INFO.social.tiktok;
  readonly github = APP_SHARED_INFO.social.github;
}
