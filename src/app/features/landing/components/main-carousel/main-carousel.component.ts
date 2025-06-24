import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgStyle } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

@Component({
  selector: 'app-main-carousel',
  imports: [RouterModule, NgStyle],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCarouselComponent implements AfterViewInit {
  slides: Slide[] = [
    {
      image: '/images/carousel/carousel-1.webp',
      title: 'Bienvenido a Vital Avellaneda',
      description:
        'Somos una clínica digital y presencial al servicio de tu salud. Conectamos pacientes y profesionales de forma ágil, humana y segura.',
      buttonText: 'Conocé quiénes somos',
      buttonLink: '/quienes-somos',
    },
    {
      image: '/images/carousel/carousel-2.webp',
      title: 'Portal para Pacientes',
      description:
        'Solicitá turnos, gestioná tus consultas y accedé a tu historial médico en un solo lugar. Tu salud y bienestar, a un clic.',
      buttonText: 'Ingresar al portal',
      buttonLink: '/portal-para-pacientes',
    },
    {
      image: '/images/carousel/carousel-3.webp',
      title: 'Portal para Especialistas',
      description:
        'Organizá tu agenda, gestioná pacientes y registrá diagnósticos de forma simple. Todo lo que necesitás, desde un único panel.',
      buttonText: 'Ingresar al portal',
      buttonLink: '/portal-para-especialistas',
    },
    {
      image: '/images/carousel/carousel-4.webp',
      title: 'Especialidades y Servicios',
      description:
        'Descubrí nuestra amplia oferta médica: clínica general, pediatría, cardiología, dermatología y más.',
      buttonText: 'Explorar nuestros servicios',
      buttonLink: '/especialidades-y-servicios',
    },
    {
      image: '/images/carousel/carousel-5.webp',
      title: 'Nuestros Profesionales',
      description:
        'Conocé al equipo médico que hace posible Vital Avellaneda. Compromiso, trayectoria y calidez humana en cada consulta.',
      buttonText: 'Conocé a nuestros profesionales',
      buttonLink: '/nuestros-profesionales',
    },
  ];

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      new Swiper('.swiper', {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        allowTouchMove: true,
        effect: 'slide',
        speed: 1000,
        slidesPerView: 1,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }
}
