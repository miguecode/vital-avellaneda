import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from "../../icons/svg-icon.component";

interface NavbarContent {
  navItems: Array<{
    title: string;
    ariaLabel: string;
    href: string;
  }>;
}
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SvgIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements NavbarContent {
  navItems = [
    {
      title: 'Quiénes Somos',
      ariaLabel: 'Sección sobre quiénes somos',
      href: '/info/quienes-somos',
    },
    // { title: 'Contacto', ariaLabel: 'Sección de contacto', href: '/' },
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
}
