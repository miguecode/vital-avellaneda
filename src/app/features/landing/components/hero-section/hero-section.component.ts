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
  selector: 'app-hero-section',
  imports: [RouterModule, NgStyle],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent implements AfterViewInit {
  slides: Slide[] = [
    {
      image: '/images/carrousel/carrousel-1.jpg',
      title: 'Vital Avellaneda! ✅',
      description: 'Probando mi carrusel',
      buttonText: 'Más información',
      buttonLink: '/',
    },
    {
      image: '/images/carrousel/carrousel-2.jpg',
      title: 'Segunda imagen del carrusel',
      description: 'ssssssssss',
      buttonText: 'Más información',
      buttonLink: '/',
    },
    {
      image: '/images/carrousel/carrousel-3.jpg',
      title: 'Probando el carrusel',
      description: 'Hola, descubre nuestros servicios y cómo podemos ayudarte.',
      buttonText: 'Más información',
      buttonLink: '/',
    },
  ];

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      new Swiper('.swiper', {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
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
