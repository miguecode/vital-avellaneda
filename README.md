# 🩺 Vital Avellaneda - Clínica Online

Vital Avellaneda es la simulación de una clínica médica online desarrollada con Angular 20 y Tailwind CSS. Permite a pacientes y especialistas gestionar turnos médicos, historial clínico y perfiles de usuario en un entorno moderno, responsive y con arquitectura profesional.

Es mi proyecto principal hasta el momento, donde puse en práctica todo lo que aprendí sobre Clean Architecture, Angular moderno (Signals, Zoneless, SSR), Tailwind CSS, Firebase y Cloudinary. Buenas prácticas, diseño responsive, accesibilidad, SEO y rendimiento.

## 🔗 Enlaces directos

- ⭐ **[Sitio Web de Vital Avellaneda](https://vital-avellaneda.web.app/)** → *¡Probalo con los Ingresos Rápidos!*

- ▶ **[Video Demostración en YouTube](https://youtu.be/PC0unpPIUWw)**

## 📚 Índice

  - [📖 Historia y Motivos](#-historia-y-motivos)
  - [🛠️ Stack Tecnológico](#%EF%B8%8F-stack-tecnol%C3%B3gico)
  - [📂 Arquitectura](#-arquitectura)
  - [✨ Características](#-características)
  - [📸 Capturas](#-capturas)
  - [🔮 Futuro del proyecto](#-futuro-del-proyecto)
  - [📌 Aclaraciones](#-aclaraciones)

<img width="1920" height="1080" alt="Imagen de presentación" src="https://github.com/user-attachments/assets/0e4194e3-d47c-4729-9ead-7d2f6b047f6a" />

## 📖 Historia y Motivos

Este proyecto nace como una versión super mejorada de una clínica online que había desarrollado en la facultad usando Angular 17, cuando todavía cursaba la Tecnicatura Universitaria en Programación allá por el 2023.
La diferencia es abismal: aquella fue mi primera app web, mientras que Vital Avellaneda es una versión profesional, con mejores tecnologías, prácticas, una arquitectura sólida y una experiencia de usuario cuidada. 

La idea principal es crear un sitio completo desde una lógica de negocio sólida hasta una interfaz y experiencia de usuario simple y efectiva. Entre la idea, la creación y la finalización, estuve desde Junio hasta Septiembre de 2025 llevándolo a cabo. Fue una linda experiencia y estoy satisfecho con el resultado, por más que hay matices u otras características que podría implementar o mejorar.

## 🛠️ Stack Tecnológico

- Frontend: Angular 20 (standalone, signals, zoneless, control flow syntax, SSR)
- Estilos: Tailwind CSS
- Backend/Hosting: Firebase (auth, db, hosting)
- Media: Cloudinary (media storage)
- Forms: Reactive Forms + Validaciones personalizadas

## 📂 Arquitectura

Implementé una Clean Architecture simplificada, con tres capas principales:

```
app/  
├── core/         👉 Domain (models, enums, interfaces, guards, constants, config)  
├── services/     👉 Adapters (Firebase, Cloudinary)  
├── features/     👉 Use cases + Presentation (facades, components, pages)  
└── shared/          
```

1. Domain 

  Defino la lógica de negocio: entidades, enumerados, contratos y las interfaces que actúan como repositorios.

2. Adapters

  Servicios concretos que implementan las interfaces del Domain. Ejemplo: auth.service.ts en Firebase implementa auth.repository.ts. Hago uso de InjectionTokens para desacoplar totalmente la implementación (Firebase ↔️ otro proveedor).

3. Use Cases + Presentation

  Cada feature tiene sus propios componentes, páginas y fachadas. Estos últimos hacen de intermediarios entre UI y lógica con el fin de simplificar la inyección de servicios.

## ✨ Características

- 🌍 Inicio e información

    - Sección “hero” con carrusel de imágenes, título y descripciones.
    - Contacto directo (Email, WhatsApp, Ubicación).
    - Botón de acceso rápido para “Ingresar al Portal”.
    - Sección de presentación breve.
    - Previsualización de Novedades.
    - Testimonios de pacientes y especialistas.
    - Páginas individuales para información: Quiénes Somos, Servicios, y más.
    - Página de Centro de Ayuda con FAQ y Contactos.
    - Página con un listado de Novedades con su título, autor, contenido y más.

- 👥 Roles y posibles acciones

  -  Paciente
      - Ver y editar sus propios datos.
      - Revisar y gestionar sus turnos (pendientes, cancelados o completados).
      - Consultar su historial médico al detalle.
      - Solicitar un nuevo turno en un formulario de 4 pasos.
      - Descargar la información de un turno en formato PDF.
      - Calificar la atención de un turno una vez ya completado.

  - Especialista
      - Ver y editar sus propios datos.
      - Revisar y gestionar sus turnos (pendientes, cancelados o completados).
      - Ver la lista completa de sus pacientes ya atendidos.
      - Consultar el historial clínico de cualquier paciente.
      - Determinar un diagnóstico con 3 campos de texto, y modificar datos médicos del paciente.
      - Descargar la información de un turno en formato PDF.

- 🔑 Autenticación

  - Uso del servicio Authentication de Firebase.
  - Login clásico (email/contraseña).
  - Accesos rápidos para probar el sitio (2 pacientes, 2 especialistas).
  - Registro con validaciones personalizadas por rol.

- ⚡ Funcionalidades Generales

  - Gestión completa de turnos (crear, cancelar, completar, calificar, descargar).
  - Modales dinámicos: confirmación, diagnósticos, calificación, cancelación, confirmación.
  - Historia clínica generada automáticamente con los turnos completados.
  - Edición de perfil con foto de perfil en Cloudinary.
  - Centro de ayuda, políticas y términos.
  - Blog con publicaciones sobre el sitio y la salud.

- 🧩 Decisiones y Simplificaciones

  - Desestimación del rol Administrador (no aportaba valor real, podría agregarlo en un futuro).
  - Disponibilidad horaria con presets en vez de manual → más simple y usable.
  - Historia clínica = lista de turnos completados en vez de una entidad separada (para evitar sobreingeniería).
  - SSR: funciona y la app está hecha para usarlo, pero por limitaciones de Firebase Hosting se dejó como SPA clásica.

- 📱 Diseño y Desarrollo

  - Responsive real → funciona y se ve perfecto hasta en 320px (ej: iPhone 5 / Samsung Pocket).
  - Diseño simple, minimalista y moderno. Todos los botones y secciones son autoexplicativos, todo está claro y se realiza en pocos clics.
  - Análisis de Lighthouse/Google PageSpeed Insights:
      - SEO: **100/100** en todas las páginas.
      - Accesibilidad: **100/100** en todas las páginas.
      - Buenas prácticas: **100/100** en todas las páginas.
      - Performance: **95–100** en escritorio, **75–80** en mobile (limitación típica en Angular, pero en uso real va perfecto).

- 🧪 Aprendizajes

  - Programar en inglés.
  - Hacer constantes commits en Git.
  - Mantener y trabajar en un proyecto intermedio-grande. Casi 3 meses sin parar.
  - La reutilización de componentes y tener componentes "Page" o "Layout".
  - La reutilización de estilos (gracias a las clases utilitarias de Tailwind o variables CSS).
  - La importancia de la arquitectura: consistencia en la creación de características, servicios, entidades y demás.
  - La importancia de simplificar conceptos de la lógica de negocios para evitar sobreingeniería.
  - Signals como herramienta clave para la reactividad en Angular 20.
  - Hacer un HTML semántico para mejor Accesibilidad y SEO. Analizar página por página con Lighthouse.
  - Cómo hacer un buen README 😁.

## 📸 Capturas

  <img width="1904" height="1078" alt="Imagen de Login" src="https://github.com/user-attachments/assets/9c8f23ed-8ce5-47a1-97f0-52a8943d63f2" />
  <img width="1904" height="1078" alt="Imagen de Solicitar Turno" src="https://github.com/user-attachments/assets/92685029-9a9d-4261-9a12-cda957457bcc" />
  <img width="1904" height="1078" alt="Imagen de Panel de Especialista" src="https://github.com/user-attachments/assets/20807b46-4e2a-474e-ae4b-7de5c8a05015" />
  <img width="1904" height="1078" alt="Imagen de Lista de Turnos" src="https://github.com/user-attachments/assets/f0cd2ac0-c663-458e-8451-d2ec91f8bcf0" />
  <img width="1904" height="1078" alt="Imagen de Gestión de Turno" src="https://github.com/user-attachments/assets/cfcbf9a1-1906-4c05-a1ac-43e5ce005106" />

## 🔮 Futuro del proyecto

- Hacer el deploy con SSR en un hosting más flexible.
- Aplicar Signals en todos los formularios para mayor consistencia.
- Seguir optimizando performance en mobile (aunque ya es bueno).

## 📌 Aclaraciones

- Vital Avellaneda NO es una clínica médica real.
- Ninguna imagen usada en el sitio web es mía, y las fotos de perfil de los usuarios no son reales. Las saqué de ["This Person Does Not Exist"](https://thispersondoesnotexist.com/).
- Se aceptan propuestas de mejora del sitio o reportes de errores.
