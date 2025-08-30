import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../../icons/svg-icon.component';
import { NgClass } from '@angular/common';
import { APP_SHARED_INFO } from '../../../core/config/app-info';

interface NavbarContent {
  navItems: Array<{
    title: string;
    ariaLabel: string;
    href: string;
  }>;
}
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SvgIconComponent, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements NavbarContent {
  public isMenuOpen = signal(false);
  public isAnimating = signal(false);

  navItems = [
    {
      title: 'Quiénes Somos',
      ariaLabel: 'Abrir Sección sobre quiénes somos',
      href: '/info/quienes-somos',
    },
    {
      title: 'Especialidades y Servicios',
      ariaLabel: 'Abrir Sección de Especialidades y Servicios',
      href: '/info/especialidades-y-servicios',
    },
    {
      title: 'Nuestros Profesionales',
      ariaLabel: 'Abrir Sección de Nuestros Profesionales',
      href: '/info/nuestros-profesionales',
    },
    {
      title: 'Novedades',
      ariaLabel: 'Abrir Sección de Novedades',
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