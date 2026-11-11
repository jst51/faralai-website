import type { ServiceCopy } from './webDesign';

// Copy for the graphic design and branding service page, in Spanish and English.
// Targets "diseño gráfico marbella" (10–100 searches a month, low competition), with "branding
// marbella", "agencia de branding málaga" and "diseño de logotipos" as secondary terms; in English
// "graphic design marbella" and "branding agency marbella".

export const brandingEs: ServiceCopy = {
  path: '/es/diseno-grafico-branding-marbella/',
  other: '/en/graphic-design-branding-marbella/',
  meta: {
    title: 'Diseño gráfico y branding en Marbella | Faralai',
    description:
      'Diseño gráfico y branding en Marbella: estrategia de marca, creación de logotipos, identidad visual, papelería, maquetación y piezas gráficas para empresas de Málaga y la Costa del Sol. Auditoría de marca gratuita.',
  },
  crumbs: { home: 'Inicio', here: 'Diseño gráfico y branding en Marbella' },
  hero: {
    label: 'Branding y diseño gráfico · Marbella, Málaga y Costa del Sol',
    title: 'Diseño gráfico y branding en Marbella',
    sub: 'Que te reconozcan antes de leer tu nombre.',
    lead: 'Creamos marcas y diseño gráfico para empresas de Marbella y la Costa del Sol: estrategia de marca, logotipo, identidad visual y todas las piezas que tu negocio necesita, coherentes en cada punto de contacto.',
    primary: 'Pide tu auditoría de marca',
    secondary: 'Qué incluye',
    chips: ['Estrategia de marca', 'Logotipo', 'Identidad visual', 'Diseño gráfico'],
  },
  why: {
    title: 'Una marca no es un logo.',
    p: [
      'En un mercado como Marbella, donde tu cliente te compara con marcas de todo el mundo, la primera impresión decide. Una marca bien construida te permite cobrar lo que vales, atraer al cliente adecuado y que te recuerden.',
      'Por eso empezamos por la estrategia: qué te hace diferente, a quién te diriges y cómo hablas. Después lo convertimos en una identidad visual y en las piezas del día a día, con el mismo equipo.',
    ],
  },
  types: {
    title: 'Qué diseñamos',
    items: [
      { title: 'Estrategia de marca', text: 'Posicionamiento, propuesta de valor, personalidad y tono de voz: la base de todo lo demás.' },
      { title: 'Naming y logotipo', text: 'Ideación y creación de un nombre y un logotipo memorables, pensados para funcionar en cualquier tamaño y soporte.' },
      { title: 'Identidad visual', text: 'Colores, tipografías, iconos y estilo fotográfico, recogidos en un manual de marca fácil de usar.' },
      { title: 'Rebranding', text: 'Ponemos al día tu marca sin perder lo que tus clientes ya reconocen y valoran.' },
      { title: 'Diseño gráfico', text: 'Papelería, presentaciones, catálogos, folletos, maquetación de documentos, cartelería, packaging y piezas para redes.' },
      { title: 'Señalética y espacios', text: 'Tu marca en tu local, tu oficina, tus vehículos y tus eventos.' },
    ],
  },
  includes: {
    title: 'Qué incluye un proyecto de marca',
    lead: 'Todo lo que necesitas para lanzar tu marca y aplicarla con coherencia desde el primer día.',
    items: [
      'Taller de estrategia con tu equipo',
      'Análisis de tu competencia',
      'Posicionamiento y tono de voz',
      'Ideación y creación de logotipo',
      'Paleta de color y tipografías',
      'Manual de marca',
      'Plantillas para redes sociales',
      'Papelería',
      'Maquetación de documentos',
      'Plantilla de presentación',
      'Archivos listos para imprenta y digital',
      'Integración con herramientas de IA para optimizar recursos',
    ],
  },
  process: {
    title: 'Cómo lo hacemos',
    steps: [
      { title: 'Descubrimiento', text: 'Conocemos tu negocio, tus clientes y tu competencia.' },
      { title: 'Estrategia', text: 'Definimos posicionamiento, personalidad y mensajes.' },
      { title: 'Diseño', text: 'Creamos la identidad y la probamos en piezas reales antes de cerrarla.' },
      { title: 'Aplicación', text: 'Te entregamos el manual y las plantillas, y la llevamos a tu web, redes y eventos.' },
    ],
  },
  local: {
    title: 'Branding y diseño gráfico en Marbella y la Costa del Sol',
    p: [
      'Trabajamos desde Marbella con empresas de toda la Costa del Sol y con marcas internacionales que se instalan aquí. Conocemos el nivel de exigencia de este mercado: hoteles, restaurantes, inmobiliarias y marcas de lujo compiten por la atención de un cliente internacional. Tu marca tiene que estar a esa altura.',
    ],
    more: { before: '¿Necesitas también la web, las redes o el lanzamiento de la marca? El mismo equipo lo coordina todo.', link: 'Ver todos los servicios' },
  },
  faq: {
    title: 'Preguntas sobre branding',
    items: [
      { q: '¿Cuánto cuesta crear una marca?', a: 'Depende del alcance: no es lo mismo un logotipo que una identidad completa con manual y aplicaciones. Tras la auditoría gratuita te enviamos una propuesta con presupuesto cerrado.' },
      { q: '¿Qué diferencia hay entre logotipo e identidad visual?', a: 'El logotipo es la firma de tu marca. La identidad visual es el sistema completo: colores, tipografías, iconos, fotografía y cómo se combinan, para que todo lo que publiques se reconozca como tuyo.' },
      { q: '¿Hacéis rebranding de marcas que ya existen?', a: 'Sí. Analizamos qué valoran ya tus clientes y lo conservamos, mientras ponemos al día lo que se ha quedado atrás.' },
      { q: '¿Me entregáis los archivos de la marca?', a: 'Sí. Al terminar recibes los archivos de tu marca en formatos para imprenta y digital, junto con el manual para usarlos.' },
      { q: '¿Diseñáis también piezas sueltas?', a: 'Sí. Además de proyectos de marca completos, diseñamos papelería, presentaciones, catálogos, folletos, packaging o piezas para redes, y maquetamos tus documentos.' },
      { q: '¿Trabajáis con empresas fuera de Marbella?', a: 'Sí. Trabajamos con empresas de Málaga, de toda la Costa del Sol y de fuera de España, en persona o en remoto.' },
    ],
  },
  audit: {
    title: 'Pide tu auditoría de marca gratuita',
    lead: 'Revisamos cómo se ve y cómo se percibe tu marca frente a tu competencia, y te enviamos qué mejorar primero. Sin compromiso.',
  },
};

export const brandingEn: ServiceCopy = {
  path: '/en/graphic-design-branding-marbella/',
  other: '/es/diseno-grafico-branding-marbella/',
  meta: {
    title: 'Graphic Design and Branding in Marbella | Faralai',
    description:
      'Graphic design and branding in Marbella: brand strategy, logo design, visual identity, brand guidelines and graphic design for businesses in Málaga and across the Costa del Sol. Free brand audit.',
  },
  crumbs: { home: 'Home', here: 'Graphic design and branding in Marbella' },
  hero: {
    label: 'Branding and graphic design · Marbella, Málaga and the Costa del Sol',
    title: 'Graphic design and branding in Marbella',
    sub: 'Be recognised before they read your name.',
    lead: 'We create brands and graphic design for businesses in Marbella and across the Costa del Sol: brand strategy, logo, visual identity and every piece your business needs, consistent at every touchpoint.',
    primary: 'Request your brand audit',
    secondary: 'What’s included',
    chips: ['Brand strategy', 'Logo', 'Visual identity', 'Graphic design'],
  },
  why: {
    title: 'A brand isn’t a logo.',
    p: [
      'In a market like Marbella, where clients compare you with brands from all over the world, first impressions decide. A well-built brand lets you charge what you’re worth, attract the right clients and stay memorable.',
      'That’s why we start with strategy: what makes you different, who you’re talking to and how you sound. Then we turn it into a visual identity and the everyday pieces, with the same team.',
    ],
  },
  types: {
    title: 'What we design',
    items: [
      { title: 'Brand strategy', text: 'Positioning, value proposition, personality and tone of voice: the foundation for everything else.' },
      { title: 'Naming and logo', text: 'Ideation and design of a memorable name and logo, built to work at any size and on any medium.' },
      { title: 'Visual identity', text: 'Colours, typefaces, icons and photographic style, gathered in brand guidelines that are easy to use.' },
      { title: 'Rebranding', text: 'We bring your brand up to date without losing what your clients already recognise and value.' },
      { title: 'Graphic design', text: 'Stationery, presentations, catalogues, brochures, document layout, signage, packaging and social media graphics.' },
      { title: 'Signage and spaces', text: 'Your brand in your shop, your office, your vehicles and your events.' },
    ],
  },
  includes: {
    title: 'What a brand project includes',
    lead: 'Everything you need to launch your brand and apply it consistently from day one.',
    items: [
      'Strategy workshop with your team',
      'Competitor analysis',
      'Positioning and tone of voice',
      'Logo concept and design',
      'Colour palette and typefaces',
      'Brand guidelines',
      'Social media templates',
      'Stationery',
      'Document layout',
      'Presentation template',
      'Print-ready and digital files',
      'AI tool integration to make the most of your resources',
    ],
  },
  process: {
    title: 'How we work',
    steps: [
      { title: 'Discovery', text: 'We get to know your business, your clients and your competitors.' },
      { title: 'Strategy', text: 'We define positioning, personality and messages.' },
      { title: 'Design', text: 'We create the identity and test it on real pieces before signing it off.' },
      { title: 'Roll-out', text: 'We hand over the guidelines and templates, and bring it to your website, social media and events.' },
    ],
  },
  local: {
    title: 'Branding and graphic design in Marbella and the Costa del Sol',
    p: [
      'We work from Marbella with businesses across the Costa del Sol and with international brands setting up here. We know how demanding this market is: hotels, restaurants, estate agents and luxury brands all compete for the attention of an international client. Your brand has to match.',
    ],
    more: { before: 'Need the website, social media or brand launch as well? The same team coordinates it all.', link: 'See all services' },
  },
  faq: {
    title: 'Branding questions',
    items: [
      { q: 'How much does it cost to create a brand?', a: 'It depends on the scope: a logo is very different from a full identity with guidelines and applications. After the free audit we send you a proposal with a fixed quote.' },
      { q: 'What’s the difference between a logo and a visual identity?', a: 'The logo is your brand’s signature. The visual identity is the whole system: colours, typefaces, icons, photography and how they work together, so everything you publish is recognisably yours.' },
      { q: 'Do you rebrand existing brands?', a: 'Yes. We work out what your clients already value and keep it, while updating whatever has fallen behind.' },
      { q: 'Do I get the brand files?', a: 'Yes. At the end you receive your brand files in print and digital formats, along with the guidelines for using them.' },
      { q: 'Do you design one-off pieces too?', a: 'Yes. As well as full brand projects, we design stationery, presentations, catalogues, brochures, packaging and social media graphics, and lay out your documents.' },
      { q: 'Do you work with businesses outside Marbella?', a: 'Yes. We work with businesses in Málaga, across the Costa del Sol and outside Spain, in person or remotely.' },
    ],
  },
  audit: {
    title: 'Request your free brand audit',
    lead: 'We review how your brand looks and is perceived against your competitors, and send you what to fix first. No commitment.',
  },
};

export const brandingVisualLabels = {
  es: { brand: 'Tu marca', palette: 'Paleta', type: 'Tipografía', badge: 'Manual de marca' },
  en: { brand: 'Your brand', palette: 'Palette', type: 'Typography', badge: 'Brand guidelines' },
};
