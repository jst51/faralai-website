// Text of the legal pages, in Spanish and English.
// Anything in [SQUARE BRACKETS] is a detail still to be filled in: the pages highlight it in yellow,
// and the site should not go live until none are left.

export const OWNER = {
  name: "[NOMBRE Y APELLIDOS O RAZÓN SOCIAL]",
  taxId: "[NIF / CIF]",
  address: "[DOMICILIO COMPLETO]",
  registry: "[DATOS DEL REGISTRO MERCANTIL, SOLO SI ES UNA SOCIEDAD]",
  email: "info@faralai.com",
  host: "[NOMBRE Y PAÍS DEL PROVEEDOR DE HOSTING]",
  formspreeTransfer: "[CONFIRMAR CON FORMSPREE: MECANISMO DE TRANSFERENCIA]",
};

const o = OWNER;

export type Section = {
  h: string;
  p?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  after?: string[];
};
export type LegalDoc = { title: string; intro?: string; sections: Section[] };
export type DocKey = "notice" | "privacy" | "cookies";

export const LEGAL: Record<"es" | "en", Record<DocKey, LegalDoc>> = {
  es: {
    notice: {
      title: "Aviso legal",
      sections: [
        {
          h: "Titular del sitio web",
          p: ["En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), estos son los datos del titular de faralai.com:"],
          list: [`Titular: ${o.name}`, "Nombre comercial: Faralai", `NIF / CIF: ${o.taxId}`, `Domicilio: ${o.address}`, `Correo electrónico: ${o.email}`, `Registro: ${o.registry}`],
        },
        { h: "Objeto", p: ["Este sitio web presenta los servicios de consultoría de negocio, marketing, comunicación y diseño de Faralai, y permite solicitar una auditoría gratuita."] },
        { h: "Condiciones de uso", p: ["Al navegar por este sitio aceptas usarlo de forma lícita y no realizar acciones que puedan dañarlo o impedir su normal funcionamiento."] },
        {
          h: "Propiedad intelectual e industrial",
          p: [
            "Los textos, diseños, gráficos y el código de este sitio pertenecen a su titular o se usan con la debida autorización. No puedes reproducirlos ni distribuirlos con fines comerciales sin permiso previo y por escrito.",
            "Las marcas y logotipos de terceros que aparecen en el sitio pertenecen a sus respectivos titulares y se muestran únicamente para reflejar la experiencia profesional del equipo de Faralai, sin que ello implique patrocinio o vinculación actual.",
          ],
        },
        { h: "Responsabilidad", p: ["Procuramos que la información sea correcta y esté actualizada, pero no garantizamos la ausencia de errores ni la disponibilidad permanente del sitio. La información publicada no sustituye al asesoramiento profesional adaptado a cada caso."] },
        { h: "Enlaces a otros sitios", p: ["Este sitio puede enlazar a páginas de terceros. No controlamos su contenido ni somos responsables de él."] },
        { h: "Legislación aplicable", p: ["Este aviso se rige por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales que correspondan conforme a la ley."] },
      ],
    },
    privacy: {
      title: "Política de privacidad",
      intro: "Aquí explicamos qué datos personales tratamos en faralai.com, para qué y qué derechos tienes.",
      sections: [
        { h: "Responsable del tratamiento", list: [`Responsable: ${o.name}`, `NIF / CIF: ${o.taxId}`, `Domicilio: ${o.address}`, `Contacto: ${o.email}`] },
        {
          h: "Qué datos tratamos y para qué",
          table: {
            head: ["Actividad", "Datos", "Finalidad", "Base legal"],
            rows: [
              ["Formulario de auditoría", "Nombre, empresa, email, teléfono (opcional), web o Instagram, sector y necesidad", "Responder a tu solicitud y elaborar y enviarte la auditoría", "Tu consentimiento (art. 6.1.a RGPD)"],
              ["Correo electrónico", "Los datos que nos envíes", "Atender tu consulta", "Tu consentimiento (art. 6.1.a RGPD)"],
              ["Analítica web", "Datos de navegación e identificadores en línea", "Saber cómo se usa la web para mejorarla, solo si aceptas las cookies analíticas", "Tu consentimiento (art. 6.1.a RGPD)"],
            ],
          },
          after: ["No tomamos decisiones automatizadas con efectos jurídicos sobre ti ni elaboramos perfiles con estos datos."],
        },
        { h: "Cuánto tiempo los conservamos", p: ["Los datos de tu solicitud se conservan mientras la gestionamos y, si no se inicia una relación profesional, un máximo de 12 meses. Si te conviertes en cliente, se conservarán durante la relación y los plazos legales aplicables. Si retiras tu consentimiento, dejaremos de usarlos."] },
        {
          h: "Con quién los compartimos",
          p: ["No vendemos tus datos. Solo acceden a ellos los proveedores que necesitamos para prestar el servicio, que actúan como encargados del tratamiento:"],
          list: [
            `Formspree, Inc. (Estados Unidos): recibe y entrega los envíos del formulario. Transferencia internacional: ${o.formspreeTransfer}.`,
            "Google Ireland Limited (Google Analytics): solo si aceptas las cookies analíticas. Los datos pueden transferirse a Google LLC en Estados Unidos, con las garantías del Marco de Privacidad de Datos UE-EE. UU.",
            `${o.host}: alojamiento del sitio web.`,
          ],
          after: ["Las tipografías del sitio se sirven desde nuestro propio servidor, por lo que no se envían datos a terceros para cargarlas."],
        },
        {
          h: "Tus derechos",
          p: [`Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo a ${o.email}. Retirarlo no afecta a la licitud del tratamiento anterior.`, "Si consideras que no hemos tratado tus datos correctamente, puedes reclamar ante la Agencia Española de Protección de Datos: https://www.aepd.es"],
        },
        { h: "Menores", p: ["Este sitio se dirige a empresas y profesionales. No recogemos conscientemente datos de menores de 14 años."] },
        { h: "Cambios", p: ["Podemos actualizar esta política. La fecha de la última revisión aparece en esta página."] },
      ],
    },
    cookies: {
      title: "Política de cookies",
      intro: "Las cookies son pequeños archivos que un sitio web guarda en tu dispositivo. Solo usamos cookies analíticas si nos das permiso.",
      sections: [
        {
          h: "Qué cookies usamos",
          table: {
            head: ["Nombre", "Tipo", "Titular", "Finalidad", "Duración"],
            rows: [
              ["faralai-consent", "Técnica (almacenamiento local)", "Faralai", "Recordar tu elección sobre las cookies", "24 meses"],
              ["faralai-lang", "Técnica (almacenamiento local)", "Faralai", "Recordar el idioma, solo si lo cambias tú", "Hasta que la borres"],
              ["_ga", "Analítica", "Google", "Distinguir visitantes de forma estadística", "2 años"],
              ["_ga_5Z6D130GKW", "Analítica", "Google", "Mantener el estado de la sesión", "2 años"],
            ],
          },
          after: ["Las cookies de Google Analytics solo se instalan después de que pulses Aceptar. Si las rechazas, Google Analytics no se carga."],
        },
        { h: "Cómo cambiar tu elección", p: ["Puedes aceptar o rechazar las cookies analíticas en cualquier momento con el enlace Configurar cookies, al pie de cada página. Si las rechazas después de haberlas aceptado, las eliminamos de tu navegador. Te volveremos a preguntar pasados 24 meses o si esta política cambia.", "También puedes borrar o bloquear las cookies desde los ajustes de tu navegador."] },
        { h: "Transferencias internacionales", p: ["Google puede transferir datos a Estados Unidos. Puedes consultar cómo los trata en https://policies.google.com/privacy"] },
        { h: "Más información", p: [`Para cualquier duda, escríbenos a ${o.email}. Puedes ver cómo tratamos tus datos en la Política de privacidad.`] },
      ],
    },
  },
  en: {
    notice: {
      title: "Legal notice",
      intro: "This English version is provided for convenience. If there is any discrepancy, the Spanish version prevails.",
      sections: [
        {
          h: "Website owner",
          p: ["In accordance with Spanish Law 34/2002 on information society services and e-commerce (LSSI-CE), these are the details of the owner of faralai.com:"],
          list: [`Owner: ${o.name}`, "Trade name: Faralai", `Tax ID: ${o.taxId}`, `Address: ${o.address}`, `Email: ${o.email}`, `Registry: ${o.registry}`],
        },
        { h: "Purpose", p: ["This website presents Faralai’s business consulting, marketing, communications and design services, and lets you request a free audit."] },
        { h: "Terms of use", p: ["By browsing this site you agree to use it lawfully and not to do anything that could damage it or disrupt its normal operation."] },
        {
          h: "Intellectual and industrial property",
          p: [
            "The text, designs, graphics and code on this site belong to its owner or are used with proper authorisation. You may not reproduce or distribute them for commercial purposes without prior written permission.",
            "Third-party trademarks and logos shown on this site belong to their respective owners and appear only to reflect the professional experience of the Faralai team, without implying sponsorship or any current affiliation.",
          ],
        },
        { h: "Liability", p: ["We work to keep the information accurate and up to date, but we do not guarantee that it is free of errors or that the site will always be available. The information published does not replace professional advice tailored to each case."] },
        { h: "Links to other sites", p: ["This site may link to third-party pages. We do not control their content and are not responsible for it."] },
        { h: "Applicable law", p: ["This notice is governed by Spanish law. Any dispute will be submitted to the courts that have jurisdiction under the law."] },
      ],
    },
    privacy: {
      title: "Privacy policy",
      intro: "This page explains what personal data we process on faralai.com, why, and what your rights are. It is provided for convenience; if there is any discrepancy, the Spanish version prevails.",
      sections: [
        { h: "Data controller", list: [`Controller: ${o.name}`, `Tax ID: ${o.taxId}`, `Address: ${o.address}`, `Contact: ${o.email}`] },
        {
          h: "What data we process and why",
          table: {
            head: ["Activity", "Data", "Purpose", "Legal basis"],
            rows: [
              ["Audit form", "Name, company, email, phone (optional), website or Instagram, industry and need", "Replying to your request and preparing and sending your audit", "Your consent (Art. 6(1)(a) GDPR)"],
              ["Email", "The data you send us", "Answering your enquiry", "Your consent (Art. 6(1)(a) GDPR)"],
              ["Web analytics", "Browsing data and online identifiers", "Understanding how the site is used in order to improve it, only if you accept analytics cookies", "Your consent (Art. 6(1)(a) GDPR)"],
            ],
          },
          after: ["We do not make automated decisions with legal effects on you or build profiles from this data."],
        },
        { h: "How long we keep it", p: ["We keep the data from your request while we handle it and, if no professional relationship follows, for a maximum of 12 months. If you become a client, it will be kept for the duration of the relationship and the applicable legal periods. If you withdraw your consent, we will stop using it."] },
        {
          h: "Who we share it with",
          p: ["We do not sell your data. Only the providers we need to deliver the service can access it, acting as data processors:"],
          list: [
            `Formspree, Inc. (United States): receives and delivers form submissions. International transfer: ${o.formspreeTransfer}.`,
            "Google Ireland Limited (Google Analytics): only if you accept analytics cookies. Data may be transferred to Google LLC in the United States, under the safeguards of the EU-US Data Privacy Framework.",
            `${o.host}: website hosting.`,
          ],
          after: ["The site’s fonts are served from our own server, so no data is sent to third parties to load them."],
        },
        {
          h: "Your rights",
          p: [`You can exercise your rights of access, rectification, erasure, objection, restriction of processing and portability, and withdraw your consent at any time, by writing to ${o.email}. Withdrawing it does not affect the lawfulness of earlier processing.`, "If you believe we have not handled your data correctly, you can complain to the Spanish Data Protection Agency: https://www.aepd.es"],
        },
        { h: "Minors", p: ["This site is aimed at companies and professionals. We do not knowingly collect data from children under 14."] },
        { h: "Changes", p: ["We may update this policy. The date of the last review appears on this page."] },
      ],
    },
    cookies: {
      title: "Cookie policy",
      intro: "Cookies are small files a website stores on your device. We only use analytics cookies if you give us permission.",
      sections: [
        {
          h: "Cookies we use",
          table: {
            head: ["Name", "Type", "Owner", "Purpose", "Duration"],
            rows: [
              ["faralai-consent", "Technical (local storage)", "Faralai", "Remembering your cookie choice", "24 months"],
              ["faralai-lang", "Technical (local storage)", "Faralai", "Remembering your language, only if you change it", "Until you delete it"],
              ["_ga", "Analytics", "Google", "Telling visitors apart for statistics", "2 years"],
              ["_ga_5Z6D130GKW", "Analytics", "Google", "Keeping the session state", "2 years"],
            ],
          },
          after: ["Google Analytics cookies are only set after you press Accept. If you reject them, Google Analytics is not loaded."],
        },
        { h: "How to change your choice", p: ["You can accept or reject analytics cookies at any time with the Cookie settings link at the foot of every page. If you reject them after accepting, we remove them from your browser. We will ask again after 24 months or if this policy changes.", "You can also delete or block cookies in your browser settings."] },
        { h: "International transfers", p: ["Google may transfer data to the United States. You can read how it handles data at https://policies.google.com/privacy"] },
        { h: "More information", p: [`If you have any questions, write to ${o.email}. You can see how we handle your data in the Privacy policy.`] },
      ],
    },
  },
};
