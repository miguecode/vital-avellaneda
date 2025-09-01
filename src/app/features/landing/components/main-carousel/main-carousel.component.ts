import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
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
  imports: [RouterModule],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCarouselComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  private swiperInstance?: Swiper;

  slides: Slide[] = [
    {
      image: '/images/carousel/carousel-1.webp',
      title: 'Bienvenido a Vital Avellaneda',
      description:
        'Somos una Clínica digital y presencial al servicio de tu salud. Hacemos nuestro trabajo de forma humana y segura.',
      buttonText: 'Conocé más',
      buttonLink: '/info/quienes-somos',
    },
    {
      image: '/images/carousel/carousel-2.webp',
      title: 'Portal para Pacientes',
      description:
        'Solicitá turnos, gestioná consultas y accedé a tu historial. Tu salud y bienestar, a un clic.',
      buttonText: 'Ingresar al portal',
      buttonLink: '/auth/login',
    },
    {
      image: '/images/carousel/carousel-3.webp',
      title: 'Portal para Especialistas',
      description:
        'Organizá tus turnos, gestioná y registrá diagnósticos de forma rápida y simple. Todo en un único panel.',
      buttonText: 'Ingresar al portal',
      buttonLink: '/auth/login',
    },
    {
      image: '/images/carousel/carousel-4.webp',
      title: 'Especialidades y Servicios',
      description:
        'Descubrí nuestra amplia oferta médica: clínica general, pediatría, cardiología, dermatología y más.',
      buttonText: 'Ver más',
      buttonLink: '/info/especialidades-y-servicios',
    },
    {
      image: '/images/carousel/carousel-5.webp',
      title: 'Nuestros Profesionales',
      description:
        'Conocé al equipo médico que hace posible Vital Avellaneda. Calidez humana en cada consulta.',
      buttonText: 'Ver más',
      buttonLink: '/info/nuestros-profesionales',
    },
  ];

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.swiperInstance = new Swiper(this.swiperContainer.nativeElement, {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        allowTouchMove: true,
        effect: 'slide',
        speed: 1000,
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
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
        on: {
          init: () => {
            this.updateTabIndex();
          },
          slideChange: () => {
            this.updateTabIndex();
          },
        },
      });
    }
  }

  private updateTabIndex(): void {
    if (!this.swiperInstance) return;

    const slides = this.swiperInstance.slides;
    const activeIndex = this.swiperInstance.realIndex;

    slides.forEach((slide, index) => {
      const button = slide.querySelector('a');
      if (button) {
        // The `data-swiper-slide-index` attribute holds the real index in loop mode
        const realIndex = parseInt(
          slide.getAttribute('data-swiper-slide-index') || '0',
          10
        );
        if (realIndex === activeIndex) {
          button.setAttribute('tabindex', '0');
        } else {
          button.setAttribute('tabindex', '-1');
        }
      }
    });
  }
}
