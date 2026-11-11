import type { ServiceCopy } from './webDesign';

// Copy for the events service page, in Spanish and English.
// Targets "organización de eventos marbella", with "organización de eventos málaga", "agencia de eventos
// málaga" and "eventos corporativos marbella" as secondary terms; in English "event planner marbella",
// "event management marbella" and "corporate events marbella".

export const eventsEs: ServiceCopy = {
  path: '/es/organizacion-eventos-marbella/',
  other: '/en/event-planner-marbella/',
  meta: {
    title: 'Organización de eventos en Marbella | Eventos de empresa | Faralai',
    description:
      'Organización de eventos en Marbella y Málaga: eventos corporativos, lanzamientos, experiencias de marca y patrocinios, del concepto a la producción. Cuéntanos tu evento.',
  },
  crumbs: { home: 'Inicio', here: 'Organización de eventos en Marbella' },
  hero: {
    label: 'Eventos y experiencias · Marbella, Málaga y Costa del Sol',
    title: 'Organización de eventos en Marbella',
    sub: 'Eventos que se recuerdan. Y que venden.',
    lead: 'Diseñamos y producimos eventos corporativos y experiencias de marca en Marbella y la Costa del Sol: del concepto y la estrategia a la producción, la comunicación y la medición de resultados.',
    primary: 'Cuéntanos tu evento',
    secondary: 'Qué incluye',
    chips: ['Eventos corporativos', 'Lanzamientos', 'Experiencias de marca', 'Patrocinios'],
  },
  why: {
    title: 'Un evento no es una fiesta. Es una herramienta.',
    p: [
      'Un buen evento reúne en una tarde a los clientes, socios y periodistas que tardarías meses en ver uno a uno. Pero solo funciona si tiene un objetivo claro: lanzar un producto, cerrar acuerdos, posicionar tu marca o fidelizar a tus mejores clientes.',
      'Por eso diseñamos cada evento desde la estrategia de marketing y lo conectamos con tu comunicación antes, durante y después. Marbella pone el escenario; nosotros, el plan y la ejecución.',
    ],
  },
  types: {
    title: 'Qué eventos organizamos',
    items: [
      { title: 'Eventos corporativos', text: 'Convenciones, reuniones de equipo, incentivos y cenas de empresa, con la imagen que tu marca merece.' },
      { title: 'Lanzamientos de producto', text: 'Presentaciones a clientes, prensa e influencers para que tu novedad dé que hablar desde el primer día.' },
      { title: 'Experiencias de marca', text: 'Pop-ups, activaciones y espacios donde el público vive tu marca en lugar de solo verla.' },
      { title: 'Patrocinios y alianzas', text: 'Partnership marketing: buscamos y gestionamos alianzas con marcas, eventos y entidades que comparten tu público.' },
      { title: 'Eventos para clientes VIP', text: 'Encuentros exclusivos para fidelizar a tus mejores clientes y abrir la puerta a los siguientes.' },
      { title: 'Comunicación del evento', text: 'Invitaciones, redes sociales, prensa, foto y vídeo para que el evento llegue más allá de quienes asistieron.' },
    ],
  },
  includes: {
    title: 'Qué incluye cada evento',
    lead: 'Un solo equipo de principio a fin: piensa el evento, lo produce y lo convierte en resultados.',
    items: [
      'Objetivos y concepto creativo',
      'Presupuesto y calendario por fases',
      'Búsqueda de espacio y proveedores',
      'Diseño del espacio y de la experiencia',
      'Imagen gráfica, señalética y materiales',
      'Gestión de invitados y acreditaciones',
      'Producción y coordinación el día del evento',
      'Fotografía, vídeo y contenido para redes',
      'Comunicación antes, durante y después',
      'Informe de resultados y contactos generados',
    ],
  },
  process: {
    title: 'Cómo lo hacemos',
    steps: [
      { title: 'Objetivo', text: 'Definimos qué tiene que conseguir el evento y cómo lo vamos a medir.' },
      { title: 'Concepto', text: 'Creamos la idea, la experiencia, el formato y el presupuesto.' },
      { title: 'Producción', text: 'Coordinamos espacio, proveedores, invitados y montaje hasta el último detalle.' },
      { title: 'Seguimiento', text: 'Convertimos asistentes en contactos y medimos el resultado frente al objetivo.' },
    ],
  },
  local: {
    title: 'Eventos en Marbella, Málaga y la Costa del Sol',
    p: [
      'Marbella es uno de los mejores escenarios de Europa para un evento: clima, hoteles y espacios de primer nivel, y un público internacional. Organizamos eventos en Marbella, Puerto Banús, Estepona, Sotogrande y Málaga, para empresas de aquí y para marcas que vienen de fuera, con la experiencia de proyectos para la NBA, la UEFA y la Fórmula 1.',
    ],
    more: { before: '¿Necesitas también la web del evento, la campaña o el branding? El mismo equipo lo coordina todo.', link: 'Ver todos los servicios' },
  },
  faq: {
    title: 'Preguntas sobre eventos',
    items: [
      { q: '¿Cuánto cuesta organizar un evento en Marbella?', a: 'Depende del formato, el número de invitados, el espacio y la producción. Tras una primera conversación te enviamos una propuesta con presupuesto cerrado y desglosado por partidas.' },
      { q: '¿Con cuánta antelación hay que empezar?', a: 'Cuanto antes, más opciones de espacio y proveedores, sobre todo en temporada alta en la Costa del Sol. Aun así, valoramos también eventos con plazos cortos.' },
      { q: '¿Organizáis eventos para empresas de fuera de España?', a: 'Sí. Coordinamos eventos en Marbella y Málaga para empresas internacionales, con toda la comunicación en español, inglés u otros idiomas.' },
      { q: '¿Os encargáis también de buscar el espacio?', a: 'Sí. Proponemos espacios en la Costa del Sol según el formato y el presupuesto, y gestionamos la relación con el espacio y con los proveedores.' },
      { q: '¿Qué es el partnership marketing?', a: 'Es crear alianzas con otras marcas, eventos o entidades que comparten tu público, para llegar a más gente compartiendo costes y audiencia. Lo diseñamos y lo gestionamos por ti.' },
      { q: '¿Cómo se miden los resultados de un evento?', a: 'Fijamos el objetivo antes de empezar: contactos, ventas, prensa, asistencia o alcance en redes. Después del evento te entregamos un informe con lo conseguido.' },
    ],
  },
  audit: {
    title: 'Cuéntanos tu evento',
    lead: 'Explícanos la idea, la fecha aproximada y el público, y te respondemos con un primer enfoque. Sin compromiso.',
    includes: ['Propuesta de concepto', 'Presupuesto por partidas', 'Calendario de producción', 'Propuesta de espacios'],
  },
};

export const eventsEn: ServiceCopy = {
  path: '/en/event-planner-marbella/',
  other: '/es/organizacion-eventos-marbella/',
  meta: {
    title: 'Event Planner in Marbella | Corporate Events | Faralai',
    description:
      'Event planning and management in Marbella and Málaga: corporate events, product launches, brand experiences and sponsorships, from concept to production. Tell us about your event.',
  },
  crumbs: { home: 'Home', here: 'Event planner in Marbella' },
  hero: {
    label: 'Events and experiential · Marbella, Málaga and the Costa del Sol',
    title: 'Event planner in Marbella',
    sub: 'Events people remember. And that sell.',
    lead: 'We design and produce corporate events and brand experiences in Marbella and across the Costa del Sol: from concept and strategy to production, communication and measuring results.',
    primary: 'Tell us about your event',
    secondary: 'What’s included',
    chips: ['Corporate events', 'Launches', 'Brand experiences', 'Sponsorships'],
  },
  why: {
    title: 'An event isn’t a party. It’s a tool.',
    p: [
      'A good event brings together, in one evening, the clients, partners and press it would take you months to meet one by one. But it only works with a clear goal: launching a product, closing deals, positioning your brand or rewarding your best clients.',
      'That’s why we design every event from the marketing strategy and tie it into your communication before, during and after. Marbella provides the stage; we bring the plan and the execution.',
    ],
  },
  types: {
    title: 'Events we organise',
    items: [
      { title: 'Corporate events', text: 'Conferences, team meetings, incentives and company dinners, with the image your brand deserves.' },
      { title: 'Product launches', text: 'Presentations to clients, press and influencers so your launch gets people talking from day one.' },
      { title: 'Brand experiences', text: 'Pop-ups, activations and spaces where people live your brand instead of just seeing it.' },
      { title: 'Sponsorships and partnerships', text: 'Partnership marketing: we find and manage alliances with brands, events and organisations that share your audience.' },
      { title: 'VIP client events', text: 'Exclusive gatherings to keep your best clients close and open the door to the next ones.' },
      { title: 'Event communication', text: 'Invitations, social media, press, photo and video so the event reaches far beyond the people in the room.' },
    ],
  },
  includes: {
    title: 'What every event includes',
    lead: 'One team from start to finish: it thinks the event through, produces it and turns it into results.',
    items: [
      'Goals and creative concept',
      'Budget and timeline by stage',
      'Venue and supplier sourcing',
      'Space and experience design',
      'Graphics, signage and materials',
      'Guest list and accreditation management',
      'On-the-day production and coordination',
      'Photo, video and social content',
      'Communication before, during and after',
      'Results report and leads generated',
    ],
  },
  process: {
    title: 'How we work',
    steps: [
      { title: 'Goal', text: 'We define what the event has to achieve and how we’ll measure it.' },
      { title: 'Concept', text: 'We create the idea, the experience, the format and the budget.' },
      { title: 'Production', text: 'We coordinate venue, suppliers, guests and set-up down to the last detail.' },
      { title: 'Follow-up', text: 'We turn attendees into leads and measure the outcome against the goal.' },
    ],
  },
  local: {
    title: 'Events in Marbella, Málaga and the Costa del Sol',
    p: [
      'Marbella is one of Europe’s best stages for an event: the climate, first-class hotels and venues, and an international crowd. We organise events in Marbella, Puerto Banús, Estepona, Sotogrande and Málaga, for local businesses and for brands coming from abroad, backed by experience on projects for the NBA, UEFA and Formula 1.',
    ],
    more: { before: 'Need the event website, the campaign or the branding as well? The same team coordinates it all.', link: 'See all services' },
  },
  faq: {
    title: 'Event questions',
    items: [
      { q: 'How much does it cost to organise an event in Marbella?', a: 'It depends on the format, guest numbers, venue and production. After a first conversation we send you a proposal with a fixed, itemised quote.' },
      { q: 'How far ahead should we start?', a: 'The earlier the better for venues and suppliers, especially in high season on the Costa del Sol. That said, we also take on events at short notice.' },
      { q: 'Do you organise events for companies from outside Spain?', a: 'Yes. We run events in Marbella and Málaga for international companies, with all communication in English, Spanish or other languages.' },
      { q: 'Do you find the venue too?', a: 'Yes. We propose venues on the Costa del Sol to suit the format and budget, and manage the relationship with the venue and suppliers.' },
      { q: 'What is partnership marketing?', a: 'It’s building alliances with other brands, events or organisations that share your audience, so you reach more people while sharing costs and reach. We design and manage it for you.' },
      { q: 'How do you measure the results of an event?', a: 'We set the goal before we start: leads, sales, press, attendance or social reach. After the event we give you a report on what was achieved.' },
    ],
  },
  audit: {
    title: 'Tell us about your event',
    lead: 'Share the idea, the rough date and the audience, and we’ll come back with a first approach. No commitment.',
    includes: ['Concept proposal', 'Itemised budget', 'Production timeline', 'Venue options'],
  },
};

export const eventsVisualLabels = {
  es: {
    invite: 'Estás invitado',
    title: 'Lanzamiento',
    place: 'Marbella · 19:30',
    schedule: 'Programa',
    rows: ['Bienvenida', 'Presentación', 'Cena', 'Música en directo'],
    badge: 'Costa del Sol',
  },
  en: {
    invite: 'You’re invited',
    title: 'Launch night',
    place: 'Marbella · 7.30 pm',
    schedule: 'Run of show',
    rows: ['Welcome', 'Presentation', 'Dinner', 'Live music'],
    badge: 'Costa del Sol',
  },
};
