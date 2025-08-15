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
      <p class="mb-4 text-pretty">En nuestro continuo esfuerzo por ofrecer la mejor atención médica a la comunidad, hemos inaugurado una <strong>Unidad de Cardiología Avanzada</strong>. Este nuevo centro representa un hito para nuestra institución y nos posiciona a la vanguardia de la medicina cardiovascular en la región. Cuenta con equipos de diagnóstico por imagen de alta precisión, como un angiógrafo de última generación, salas de intervención modernizadas y un equipo de cardiólogos y técnicos de renombre con amplia experiencia.</p>
      <p class="mb-4 text-pretty">La unidad está diseñada para tratar una amplia gama de afecciones, desde chequeos preventivos y estudios de rutina hasta procedimientos de alta complejidad como angioplastias, colocación de stents y estudios electrofisiológicos. "Esta inversión nos permite no solo mejorar la precisión de nuestros diagnósticos, sino también reducir los tiempos de recuperación y ofrecer a nuestros pacientes un cuidado integral y personalizado", comentó el Dr. Ricardo Ponce, flamante jefe de la unidad. "Estamos muy orgullosos de poder brindar esta calidad de atención a nuestros pacientes", concluyó.</p>
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
      <p class="mb-4 text-pretty">La prevención es un pilar fundamental en la lucha contra la diabetes, una enfermedad que afecta a millones de personas. Por ello, el <strong>15 de septiembre de 9:00 a 14:00 hs</strong>, nuestro equipo de endocrinología y nutrición estará realizando pruebas de glucemia gratuitas, control de presión arterial y ofreciendo charlas informativas abiertas a toda la comunidad. El objetivo es concientizar sobre los factores de riesgo y la importancia de un diagnóstico temprano.</p>
      <p class="mb-4 text-pretty">No se requiere inscripción previa ni orden médica. Acérquese a nuestra sede principal para participar. Además de los controles, habrá actividades para toda la familia, stands con información sobre alimentación saludable y se entregarán materiales educativos para fomentar un estilo de vida activo y equilibrado. ¡Cuidar tu salud es el primer paso!</p>
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
      <p class="mb-4 text-pretty">Cuidar la mente es tan importante como cuidar el cuerpo, y el verano es una oportunidad ideal para recargar energías y enfocarse en el bienestar emocional. Aquí te compartimos algunos consejos prácticos de la mano de nuestra especialista, la Dra. Ana Torres:</p>
      <ol class="list-decimal pl-5 mb-4 space-y-2">
        <li class="mb-2"><strong>Desconectá digitalmente:</strong> Dedicá tiempo a actividades sin pantallas. Establecer horarios para revisar el celular puede ayudar a reducir la ansiedad y mejorar la calidad del descanso.</li>
        <li class="mb-2"><strong>Mantené una rutina flexible:</strong> Incluso en vacaciones, intentá mantener horarios regulares de sueño y comidas. Esto ayuda a regular nuestro reloj biológico y a mantener la estabilidad anímica.</li>
        <li class="mb-2"><strong>Realizá actividad física:</strong> El ejercicio libera endorfinas, conocidas como las hormonas de la felicidad, y es un potente aliado contra el estrés y la ansiedad. Una caminata diaria puede hacer una gran diferencia.</li>
        <li class="mb-2"><strong>Conectá con la naturaleza:</strong> Pasá tiempo al aire libre, ya sea en la playa, el campo o un parque. El contacto con entornos naturales tiene un efecto restaurador comprobado en nuestra salud mental.</li>
        <li class="mb-2"><strong>Buscá apoyo si lo necesitás:</strong> Las vacaciones también pueden ser un momento de reflexión que traiga a la superficie emociones difíciles. No dudes en hablar con amigos, familiares o un profesional si sentís que lo necesitás.</li>
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
      <p class="mb-4 text-pretty">En Vital Avellaneda, la experiencia de nuestros pacientes es una prioridad. Por eso, a partir de hoy, podés disfrutar de una experiencia completamente renovada al solicitar tus turnos. La nueva plataforma ha sido rediseñada desde cero para ser más ágil y amigable, e incluye:</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li class="mb-2"><strong>Disponibilidad en tiempo real:</strong> Consultá la agenda de nuestros especialistas al instante y elegí el horario que mejor se adapte a vos, sin demoras ni intermediarios.</li>
        <li class="mb-2"><strong>Recordatorios automáticos:</strong> Para que no olvides tu cita, recibirás notificaciones por email y WhatsApp 24 horas antes de tu turno.</li>
        <li class="mb-2"><strong>Acceso a historial de citas:</strong> Revisá tus próximas citas, reprogramalas si es necesario y consultá el historial de visitas de forma sencilla y segura desde tu perfil.</li>
        <li class="mb-2"><strong>Pago online integrado:</strong> Agilizá tu visita abonando la consulta o el coseguro de forma online al momento de solicitar el turno.</li>
      </ul>
      <p class="mb-4 text-pretty">Te invitamos a ingresar a la sección "Solicitar Turno" en nuestra web para descubrir todas las mejoras que hemos implementado pensando en tu comodidad.</p>
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
      <p class="mb-4 text-pretty">La vacuna contra la influenza, comúnmente conocida como gripe, es una de las herramientas de prevención más efectivas que tenemos a nuestra disposición. <strong>Es de vital importancia vacunarse todos los años</strong>, ya que las cepas del virus de la gripe mutan y cambian constantemente. La vacuna se actualiza anualmente para combatir los virus que se prevé que serán más comunes durante la próxima temporada.</p>
      <p class="mb-4 text-pretty">La vacunación no solo te protege a vos de contraer una enfermedad que puede tener complicaciones serias, sino que también es un acto de solidaridad. Al vacunarte, reducís la circulación del virus en la comunidad, protegiendo así a los más vulnerables: niños pequeños, adultos mayores y personas con condiciones médicas crónicas. No esperes a que lleguen los primeros fríos, consultá con tu médico de cabecera sobre la campaña de vacunación de este año.</p>
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
      <p class="mb-4 text-pretty">Fomentar una relación sana y positiva con la comida desde los primeros años es una de las mejores inversiones en la salud a largo plazo de nuestros hijos. Una nutrición adecuada es esencial para el crecimiento, el desarrollo cognitivo y la prevención de enfermedades. El Lic. Marcos Riera, nuestro especialista en nutrición infantil, nos comparte algunas claves:</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li class="mb-2"><strong>Ofrecer variedad de alimentos:</strong> Incluir alimentos de todos los grupos (frutas, verduras, proteínas, granos enteros, etc.) para asegurar un aporte completo de nutrientes. La clave está en el color y la diversidad en el plato.</li>
        <li class="mb-2"><strong>Ser un buen ejemplo a seguir:</strong> Los niños aprenden por imitación. Si ven a sus padres disfrutar de una dieta variada y saludable, es más probable que ellos también lo hagan.</li>
        <li class="mb-2"><strong>Involucrarlos en la cocina:</strong> Hacer que participen en la compra y preparación de las comidas puede despertar su curiosidad y animarlos a probar nuevos alimentos.</li>
        <li class="mb-2"><strong>Limitar los ultraprocesados:</strong> Reducir al mínimo el consumo de snacks de paquete, gaseosas, jugos azucarados y golosinas. Reservarlos para ocasiones especiales.</li>
      </ul>
      <p class="mb-4 text-pretty">Recordá que crear hábitos saludables es un proceso gradual que requiere paciencia y constancia. Lo importante es sentar las bases para toda la vida.</p>
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
      <p class="mb-4 text-pretty">Tanto para atletas de élite como para deportistas amateurs, las lesiones pueden ser un obstáculo frustrante. Por eso, hemos diseñado un nuevo <strong>Programa de Rehabilitación Deportiva</strong> que combina terapia manual, ejercicios terapéuticos personalizados y tecnología de avanzada para acelerar los tiempos de recuperación y, fundamentalmente, prevenir futuras lesiones.</p>
      <p class="mb-4 text-pretty">Nuestro enfoque es integral: no solo tratamos la lesión, sino que buscamos las causas subyacentes, como desequilibrios musculares o patrones de movimiento incorrectos. Contamos con un equipo de kinesiólogos y fisioterapeutas especializados en el tratamiento de atletas, trabajando de forma interdisciplinaria para que puedas volver a tu actividad física de manera segura, en el menor tiempo posible y con un mejor rendimiento. No dejes que una lesión te detenga, pedí una consulta con nuestros especialistas.</p>
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
      <p class="mb-4 text-pretty">En el ritmo de vida actual, el estrés y la ansiedad son experiencias cada vez más comunes. Para ayudarte a navegar estos desafíos, te invitamos a participar de nuestro <strong>Taller Práctico sobre Manejo del Estrés y la Ansiedad</strong>. Se trata de un espacio seguro y confidencial, guiado por nuestros profesionales de la salud mental, donde podrás aprender y practicar herramientas concretas de relajación, mindfulness y gestión emocional.</p>
      <p class="mb-4 text-pretty">El taller está estructurado en cuatro encuentros semanales, donde abordaremos diferentes temáticas y técnicas. Se dictará los días martes de 18:00 a 19:30 hs. Los cupos son limitados para garantizar una experiencia personalizada y un ambiente de confianza. Para más información sobre el programa e inscripciones, comunicate con nuestro departamento de salud mental. ¡Invertir en tu bienestar es el primer paso para una vida más plena!</p>
    `,
    tags: ['Salud Mental', 'Estrés', 'Ansiedad', 'Taller'],
  },
];