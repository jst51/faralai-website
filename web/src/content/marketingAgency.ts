import type { ServiceCopy } from './webDesign';

// Copy for the marketing agency service page, in Spanish and English.
// Targets "agencia de marketing marbella", "agencia marketing digital marbella" and "marketing digital
// marbella", with "agencia marketing malaga" / "agencia marketing digital malaga" (100–1k searches a
// month each), "community manager marbella", "agencia de publicidad marbella" and "seo marbella" as
// secondary terms; in English "marketing agency marbella" and "social media marketing marbella".

export const marketingEs: ServiceCopy = {
  path: '/es/agencia-marketing-marbella/',
  other: '/en/marketing-agency-marbella/',
  meta: {
    title: 'Agencia de marketing en Marbella | Marketing digital | Faralai',
    description:
      'Agencia de marketing digital en Marbella: estrategia, redes sociales, Google Ads, SEO y contenidos para empresas de Málaga y la Costa del Sol. Auditoría de marketing gratuita.',
  },
  crumbs: { home: 'Inicio', here: 'Agencia de marketing en Marbella' },
  hero: {
    label: 'Marketing digital · Marbella, Málaga y Costa del Sol',
    title: 'Agencia de marketing en Marbella',
    sub: 'Menos ruido. Más clientes.',
    lead: 'Somos la agencia de marketing digital que piensa como tu socio: definimos la estrategia, gestionamos tus redes sociales, tu publicidad en Google y Meta y tu posicionamiento, y medimos qué funciona para invertir donde rinde.',
    primary: 'Pide tu auditoría de marketing',
    secondary: 'Qué incluye',
    chips: ['Estrategia', 'Redes sociales', 'Google Ads', 'SEO'],
  },
  why: {
    title: 'Hacer marketing no es publicar más.',
    p: [
      'Muchas empresas de la Costa del Sol publican a diario, invierten en anuncios y aun así no saben qué les trae clientes. El problema rara vez es el esfuerzo: es la falta de un plan que conecte cada acción con un objetivo de negocio.',
      'Nosotros empezamos por ahí. Primero la estrategia: a quién te diriges, qué le dices y en qué canales. Después lo ejecutamos todo con el mismo equipo y medimos cada euro para invertir donde rinde.',
    ],
  },
  types: {
    title: 'Qué hacemos',
    items: [
      { title: 'Estrategia y plan de marketing', text: 'Objetivos, público, mensajes, canales y presupuesto, en un plan que tu equipo entiende y puede seguir.' },
      { title: 'Redes sociales', text: 'Community management en Instagram, LinkedIn, Facebook y TikTok: contenido, publicación y comunidad, con la voz de tu marca.' },
      { title: 'Publicidad online', text: 'Campañas en Google Ads, Meta y LinkedIn orientadas a contactos y ventas, no a clics.' },
      { title: 'SEO y posicionamiento', text: 'Para aparecer cuando tus clientes buscan en Google lo que ofreces en Marbella y la Costa del Sol.' },
      { title: 'Contenidos y diseño', text: 'Fotos, vídeos, piezas gráficas y textos para redes, web y campañas, coherentes con tu marca.' },
      { title: 'Analítica y resultados', text: 'Medimos qué canal trae clientes y cuánto cuesta cada uno, para decidir con datos y no por intuición.' },
    ],
  },
  includes: {
    title: 'Qué incluye trabajar con nosotros',
    lead: 'Un equipo senior que conoce tu negocio, no una cuenta más en una gran agencia.',
    items: [
      'Auditoría de tu marketing y tu competencia',
      'Plan de marketing con objetivos medibles',
      'Un responsable senior de tu cuenta',
      'Calendario de contenidos',
      'Gestión de campañas y del presupuesto publicitario',
      'Informes con resultados y próximos pasos',
      'Analítica y conversiones bien configuradas',
      'Contenido en español, inglés y otros idiomas',
      'Coordinación con tu web, diseño y eventos',
      'Reuniones de seguimiento periódicas',
      'Integración con herramientas de IA para optimizar recursos',
    ],
  },
  process: {
    title: 'Cómo lo hacemos',
    steps: [
      { title: 'Auditoría', text: 'Analizamos tu marketing actual, tus canales, tu competencia y tus datos.' },
      { title: 'Plan', text: 'Fijamos objetivos, público, mensajes, canales y presupuesto por fases.' },
      { title: 'Ejecución', text: 'Creamos el contenido, lanzamos las campañas y gestionamos tus canales.' },
      { title: 'Medición', text: 'Medimos resultados, quitamos lo que no rinde y reforzamos lo que sí.' },
    ],
  },
  local: {
    title: 'Agencia de marketing digital en Marbella y Málaga',
    p: [
      'Trabajamos desde Marbella con empresas de toda la Costa del Sol, de Sotogrande a Málaga, y con marcas internacionales que tienen aquí su mercado. Un mercado donde conviven residentes, visitantes y compradores de todo el mundo, así que preparamos campañas y contenidos en el idioma de cada cliente.',
    ],
    more: { before: '¿Necesitas también una web nueva, branding o un evento? El mismo equipo lo coordina todo.', link: 'Ver todos los servicios' },
  },
  faq: {
    title: 'Preguntas sobre marketing',
    items: [
      { q: '¿Cuánto cuesta una agencia de marketing en Marbella?', a: 'Depende de los canales y del volumen de trabajo. Empezamos con una auditoría gratuita y te proponemos un plan con presupuesto cerrado, separando nuestros honorarios de la inversión en publicidad.' },
      { q: '¿Cuándo veré resultados?', a: 'La publicidad online puede traer contactos en pocas semanas; el SEO y las redes sociales construyen resultados a medio plazo. En el plan fijamos objetivos para cada fase y los medimos.' },
      { q: '¿Gestionáis las redes sociales de mi empresa?', a: 'Sí: estrategia, contenido, publicación y gestión de la comunidad en Instagram, LinkedIn, Facebook o TikTok, según dónde esté tu cliente.' },
      { q: '¿Hacéis campañas en Google Ads y Meta?', a: 'Sí. Diseñamos, lanzamos y optimizamos campañas en Google Ads, Meta (Instagram y Facebook) y LinkedIn, orientadas a contactos y ventas.' },
      { q: '¿Podéis hacer marketing en inglés para clientes internacionales?', a: 'Sí. En la Costa del Sol es clave: preparamos contenidos y campañas en varios idiomas y segmentados por país.' },
      { q: '¿Trabajáis con empresas fuera de Marbella?', a: 'Sí. Trabajamos con empresas de Málaga, de toda la Costa del Sol y de fuera de España, en persona o en remoto.' },
    ],
  },
  audit: {
    title: 'Pide tu auditoría de marketing gratuita',
    lead: 'Revisamos tu web, tus redes, tu publicidad y tu competencia, y te enviamos las prioridades para crecer. Sin compromiso.',
  },
};

export const marketingEn: ServiceCopy = {
  path: '/en/marketing-agency-marbella/',
  other: '/es/agencia-marketing-marbella/',
  meta: {
    title: 'Marketing Agency in Marbella | Digital Marketing | Faralai',
    description:
      'Digital marketing agency in Marbella: strategy, social media, Google Ads, SEO and content for businesses in Málaga and across the Costa del Sol. Free marketing audit.',
  },
  crumbs: { home: 'Home', here: 'Marketing agency in Marbella' },
  hero: {
    label: 'Digital marketing · Marbella, Málaga and the Costa del Sol',
    title: 'Marketing agency in Marbella',
    sub: 'Less noise. More clients.',
    lead: 'We’re the digital marketing agency that thinks like a partner: we set the strategy, run your social media, your Google and Meta advertising and your SEO, and measure what works so you invest where it pays.',
    primary: 'Request your marketing audit',
    secondary: 'What’s included',
    chips: ['Strategy', 'Social media', 'Google Ads', 'SEO'],
  },
  why: {
    title: 'Marketing isn’t posting more.',
    p: [
      'Plenty of businesses on the Costa del Sol post every day, spend on ads and still don’t know what brings them clients. The problem is rarely effort: it’s the lack of a plan that ties every action to a business goal.',
      'That’s where we start. Strategy first: who you’re talking to, what you tell them and on which channels. Then we run all of it with the same team and track every euro so you invest where it pays.',
    ],
  },
  types: {
    title: 'What we do',
    items: [
      { title: 'Strategy and marketing plan', text: 'Goals, audience, messages, channels and budget, in a plan your team understands and can follow.' },
      { title: 'Social media', text: 'Social media management on Instagram, LinkedIn, Facebook and TikTok: content, posting and community, in your brand’s voice.' },
      { title: 'Online advertising', text: 'Google Ads, Meta and LinkedIn campaigns built for enquiries and sales, not clicks.' },
      { title: 'SEO', text: 'So you show up when clients search Google for what you offer in Marbella and on the Costa del Sol.' },
      { title: 'Content and design', text: 'Photos, video, graphics and copy for social, web and campaigns, consistent with your brand.' },
      { title: 'Analytics and results', text: 'We measure which channel brings clients and what each one costs, so decisions run on data, not hunches.' },
    ],
  },
  includes: {
    title: 'What working with us includes',
    lead: 'A senior team that knows your business, not one more account at a big agency.',
    items: [
      'An audit of your marketing and competitors',
      'A marketing plan with measurable goals',
      'A senior lead on your account',
      'A content calendar',
      'Campaign and ad budget management',
      'Reports with results and next steps',
      'Analytics and conversions set up properly',
      'Content in Spanish, English and other languages',
      'Coordination with your website, design and events',
      'Regular review meetings',
      'AI tool integration to make the most of your resources',
    ],
  },
  process: {
    title: 'How we work',
    steps: [
      { title: 'Audit', text: 'We review your current marketing, channels, competitors and data.' },
      { title: 'Plan', text: 'We set goals, audience, messages, channels and budget by stage.' },
      { title: 'Execution', text: 'We create the content, launch the campaigns and run your channels.' },
      { title: 'Measurement', text: 'We measure results, cut what doesn’t pay and double down on what does.' },
    ],
  },
  local: {
    title: 'Digital marketing agency in Marbella and Málaga',
    p: [
      'We work from Marbella with businesses across the Costa del Sol, from Sotogrande to Málaga, and with international brands whose market is here. It’s a market of residents, visitors and buyers from all over the world, so we build campaigns and content in each client’s language.',
    ],
    more: { before: 'Need a new website, branding or an event as well? The same team coordinates it all.', link: 'See all services' },
  },
  faq: {
    title: 'Marketing questions',
    items: [
      { q: 'How much does a marketing agency in Marbella cost?', a: 'It depends on the channels and the workload. We start with a free audit and propose a plan with a fixed quote, keeping our fees separate from your ad spend.' },
      { q: 'When will I see results?', a: 'Online advertising can bring enquiries within weeks; SEO and social media build results over the medium term. The plan sets goals for each stage, and we measure them.' },
      { q: 'Do you manage social media for businesses?', a: 'Yes: strategy, content, posting and community management on Instagram, LinkedIn, Facebook or TikTok, depending on where your clients are.' },
      { q: 'Do you run Google Ads and Meta campaigns?', a: 'Yes. We design, launch and optimise campaigns on Google Ads, Meta (Instagram and Facebook) and LinkedIn, built for enquiries and sales.' },
      { q: 'Can you market in English to international clients?', a: 'Yes. On the Costa del Sol it’s essential: we produce content and campaigns in several languages, targeted by country.' },
      { q: 'Do you work with businesses outside Marbella?', a: 'Yes. We work with businesses in Málaga, across the Costa del Sol and outside Spain, in person or remotely.' },
    ],
  },
  audit: {
    title: 'Request your free marketing audit',
    lead: 'We review your website, social media, advertising and competitors, and send you the priorities for growth. No commitment.',
  },
};

export const marketingVisualLabels = {
  es: { panel: 'Plan de marketing', leads: 'Contactos', badge: 'Costa del Sol' },
  en: { panel: 'Marketing plan', leads: 'Enquiries', badge: 'Costa del Sol' },
};
