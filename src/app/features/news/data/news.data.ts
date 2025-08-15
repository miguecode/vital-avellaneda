import { NewsPost } from '../../../core/models/news-post.model';

export const NEWS_DATA: NewsPost[] = [
  {
    id: 'nueva-unidad-cardiologia',
    title: 'Inauguramos la Nueva Unidad de Cardiología Avanzada',
    author: 'Departamento de Comunicación',
    publicationDate: '2025-08-10',
    imageUrl: '/images/news/nueva-unidad-cardiologia.webp',
    summary:
      'Vital Avellaneda se complace en anunciar la apertura de su nueva Unidad de Cardiología, equipada con tecnología de última generación para el diagnóstico y tratamiento de enfermedades cardiovasculares.',
    content: `
      <p>En nuestro continuo esfuerzo por ofrecer la mejor atención médica, hemos inaugurado una <strong>Unidad de Cardiología Avanzada</strong>. Este nuevo centro cuenta con equipos de diagnóstico por imagen de alta precisión, salas de intervención modernizadas y un equipo de cardiólogos de renombre.</p>
      <p>La unidad está diseñada para tratar una amplia gama de afecciones, desde chequeos preventivos hasta procedimientos complejos. "Esta inversión nos permite estar a la vanguardia en el cuidado del corazón de nuestros pacientes", comentó el Dr. Ricardo Ponce, jefe de la unidad.</p>
    `,
    tags: ['Cardiología', 'Nuevas Instalaciones', 'Tecnología'],
  },
  {
    id: 'jornada-prevencion-diabetes',
    title: 'Jornada Gratuita de Prevención y Detección de Diabetes',
    author: 'Salud Comunitaria',
    publicationDate: '2025-07-22',
    imageUrl: '/images/news/jornada-prevencion-diabetes.webp',
    summary:
      'El próximo 15 de septiembre, realizaremos una jornada de detección gratuita de diabetes. Invitamos a toda la comunidad a participar y conocer más sobre cómo prevenir esta enfermedad.',
    content: `
      <p>La prevención es clave en la lucha contra la diabetes. Por ello, el <strong>15 de septiembre de 9:00 a 14:00 hs</strong>, nuestro equipo de endocrinología y nutrición estará realizando pruebas de glucemia gratuitas y ofreciendo charlas informativas.</p>
      <p>No se requiere inscripción previa. Acérquese a nuestra sede principal para participar. Habrá actividades para toda la familia y se entregarán materiales educativos para fomentar un estilo de vida saludable.</p>
    `,
    tags: ['Diabetes', 'Prevención', 'Comunidad', 'Evento'],
  },
  {
    id: 'consejos-salud-mental-verano',
    title: '5 Consejos para Cuidar tu Salud Mental este Verano',
    author: 'Dr. Ana Torres, Psicología',
    publicationDate: '2025-07-05',
    imageUrl: '/images/news/consejos-salud-mental-verano.webp',
    summary:
      'El verano es una época de descanso, pero también puede traer consigo estrés. La Dra. Ana Torres nos comparte cinco consejos prácticos para mantener un equilibrio emocional durante las vacaciones.',
    content: `
      <p>Cuidar la mente es tan importante como cuidar el cuerpo. Aquí algunos consejos para este verano:</p>
      <ol>
        <li><strong>Desconectá digitalmente:</strong> Dedicá tiempo a actividades sin pantallas.</li>
        <li><strong>Mantené una rutina:</strong> Incluso en vacaciones, intentá mantener horarios regulares de sueño y comidas.</li>
        <li><strong>Realizá actividad física:</strong> El ejercicio libera endorfinas y mejora el ánimo.</li>
        <li><strong>Conectá con la naturaleza:</strong> Pasá tiempo al aire libre.</li>
        <li><strong>Buscá apoyo si lo necesitás:</strong> No dudes en hablar con amigos, familiares o un profesional.</li>
      </ol>
    `,
    tags: ['Salud Mental', 'Bienestar', 'Psicología'],
  },
  {
    id: 'nuevo-sistema-turnos-online',
    title: 'Lanzamos un Nuevo Sistema de Gestión de Turnos Online',
    author: 'Departamento de Tecnología',
    publicationDate: '2025-06-18',
    imageUrl: '/images/news/nuevo-sistema-turnos-online.webp',
    summary:
      'Para mejorar tu experiencia, hemos actualizado nuestra plataforma de turnos online. Ahora es más rápida, intuitiva y te permite gestionar tus citas médicas desde cualquier dispositivo.',
    content: `
      <p>A partir de hoy, podés disfrutar de una experiencia renovada al solicitar tus turnos. La nueva plataforma incluye:</p>
      <ul>
        <li><strong>Disponibilidad en tiempo real:</strong> Consultá la agenda de nuestros especialistas al instante.</li>
        <li><strong>Recordatorios automáticos:</strong> Recibí notificaciones por email y WhatsApp.</li>
        <li><strong>Acceso a historial:</strong> Revisá tus próximas citas y el historial de visitas de forma sencilla.</li>
      </ul>
      <p>Ingresá a la sección "Solicitar Turno" para descubrir todas las mejoras.</p>
    `,
    tags: ['Turnos Online', 'Tecnología', 'Pacientes'],
  },
  {
    id: 'importancia-vacunacion-gripe',
    title: 'La Importancia de la Vacunación Anual contra la Gripe',
    author: 'Dra. Laura Benítez, Infectología',
    publicationDate: '2025-05-29',
    imageUrl: '/images/news/importancia-vacunacion-gripe.webp',
    summary:
      'Con la llegada del invierno, la Dra. Laura Benítez nos recuerda por qué es fundamental vacunarse contra la gripe cada año para proteger nuestra salud y la de nuestro entorno.',
    content: `
      <p>La vacuna contra la influenza (gripe) es una de las herramientas más efectivas para prevenir la enfermedad y sus complicaciones. <strong>Es importante vacunarse todos los años</strong>, ya que los virus cambian constantemente.</p>
      <p>La vacunación no solo te protege a vos, sino que también reduce la circulación del virus en la comunidad, protegiendo a los más vulnerables. Consultá con tu médico de cabecera sobre la campaña de vacunación de este año.</p>
    `,
    tags: ['Vacunación', 'Gripe', 'Prevención', 'Infectología'],
  },
  {
    id: 'alimentacion-saludable-ninos',
    title: 'Nutrición Infantil: Claves para una Alimentación Saludable',
    author: 'Lic. Marcos Riera, Nutrición',
    publicationDate: '2025-05-15',
    imageUrl: '/images/news/alimentacion-saludable-ninos.webp',
    summary:
      'Una buena nutrición durante la infancia es esencial para un crecimiento y desarrollo óptimos. El Lic. Marcos Riera nos ofrece claves para construir hábitos alimenticios saludables en los más chicos.',
    content: `
      <p>Fomentar una relación sana con la comida desde pequeños es fundamental. Algunas claves son:</p>
      <ul>
        <li><strong>Ofrecer variedad:</strong> Incluir alimentos de todos los grupos (frutas, verduras, proteínas, etc.).</li>
        <li><strong>Ser un buen ejemplo:</strong> Los niños aprenden por imitación.</li>
        <li><strong>Involucrarlos en la cocina:</strong> Hacer que participen en la preparación de las comidas.</li>
        <li><strong>Limitar los ultraprocesados:</strong> Reducir el consumo de snacks, gaseosas y golosinas.</li>
      </ul>
    `,
    tags: ['Nutrición', 'Infancia', 'Alimentación Saludable'],
  },
  {
    id: 'programa-rehabilitacion-deportiva',
    title: 'Nuevo Programa de Rehabilitación para Deportistas',
    author: 'Kinesiología y Fisioterapia',
    publicationDate: '2025-04-30',
    imageUrl: '/images/news/programa-rehabilitacion-deportiva.webp',
    summary:
      'Lanzamos un programa integral de kinesiología y fisioterapia enfocado en la recuperación de lesiones deportivas y la mejora del rendimiento físico para atletas de todos los niveles.',
    content: `
      <p>Nuestro nuevo <strong>Programa de Rehabilitación Deportiva</strong> combina terapia manual, ejercicios terapéuticos y tecnología de avanzada para acelerar la recuperación y prevenir futuras lesiones.</p>
      <p>Contamos con un equipo de kinesiólogos especializados en el tratamiento de atletas, trabajando de forma personalizada para que puedas volver a tu actividad física de manera segura y en el menor tiempo posible. Pedí una consulta con nuestros especialistas.</p>
    `,
    tags: ['Kinesiología', 'Deportes', 'Rehabilitación'],
  },
  {
    id: 'taller-manejo-estres-ansiedad',
    title: 'Taller Práctico sobre Manejo del Estrés y la Ansiedad',
    author: 'Departamento de Psicología',
    publicationDate: '2025-04-12',
    imageUrl: '/images/news/taller-manejo-estres-ansiedad.webp',
    summary:
      'El próximo 5 de mayo abrimos las inscripciones para nuestro taller grupal sobre herramientas prácticas para gestionar el estrés y la ansiedad en la vida cotidiana. ¡Cupos limitados!',
    content: `
      <p>Te invitamos a participar de nuestro <strong>Taller Práctico sobre Manejo del Estrés y la Ansiedad</strong>, un espacio seguro y guiado por profesionales para aprender técnicas de relajación, mindfulness y gestión emocional.</p>
      <p>El taller se dictará los días martes de 18:00 a 19:30 hs durante cuatro semanas. Para más información e inscripciones, comunicate con nuestro departamento de salud mental. ¡No te quedes afuera!</p>
    `,
    tags: ['Salud Mental', 'Estrés', 'Ansiedad', 'Taller'],
  },
];
