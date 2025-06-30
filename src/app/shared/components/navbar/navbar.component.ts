import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserIconComponent } from "../../../icons/user-icon.component";

interface NavbarContent {
  navItems: Array<{
    title: string;
    ariaLabel: string;
    href: string;
  }>;
}
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, UserIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements NavbarContent {
  navItems = [
    {
      title: 'Quiénes Somos',
      ariaLabel: 'Sección sobre quiénes somos',
      href: '/',
    },
    // { title: 'Contacto', ariaLabel: 'Sección de contacto', href: '/' },
    {
      title: 'Especialidades y Servicios',
      ariaLabel: 'Sección de Especialidades y Servicios',
      href: '/',
    },
    {
      title: 'Nuestros Profesionales',
      ariaLabel: 'Sección de Nuestros Profesionales',
      href: '/',
    },
    {
      title: 'Novedades',
      ariaLabel: 'Sección de Novedades',
      href: '/',
    },
  ];
}
