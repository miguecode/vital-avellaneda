import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavbarContent {
  navItems: Array<{
    title: string;
    ariaLabel: string;
    href: string;
  }>;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
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
      title: 'Portal para Especialistas',
      ariaLabel: 'Portal para Especialistas',
      href: '/',
    },
    {
      title: 'Portal para Pacientes',
      ariaLabel: 'Portal para Pacientes',
      href: '/',
    },
  ];
}
