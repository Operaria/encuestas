import type { Bloque, Respuestas } from "../types";

export const webBloques: Bloque[] = [
  {
    id: 0,
    titulo: "Tus datos",
    subtitulo: "Para contactarte con tu propuesta de sitio web",
    preguntas: [
      { id: "id_nombre", tipo: "texto", label: "Tu nombre", placeholder: "Ej: María Pérez" },
      { id: "id_telefono", tipo: "tel", label: "Tu WhatsApp", hint: "Solo dígitos con código país, sin \"+\". Ej: 56912345678", placeholder: "56912345678" },
      { id: "id_email", tipo: "texto", label: "Tu email", placeholder: "maria@minegocio.cl" },
      { id: "id_rol", tipo: "texto", label: "Tu rol en el proyecto", placeholder: "Fundadora, socia, encargada de comunicaciones..." },
    ],
  },
  {
    id: 1,
    titulo: "1. Identidad del proyecto",
    subtitulo: "Queremos entender qué es lo que vamos a poner en la web",
    preguntas: [
      { id: "identidad_nombre", numero: "1.1", tipo: "texto", label: "Nombre oficial del proyecto o marca", placeholder: "Ej: Círculo Respira" },
      { id: "identidad_nombre_comercial", numero: "1.2", tipo: "texto", label: "Nombre comercial que usan en redes (si es distinto)", placeholder: "@circulorespira" },
      { id: "identidad_pitch", numero: "1.3", tipo: "textarea", label: "Tu proyecto en una frase", hint: "Como si lo explicaras a un desconocido en 10 segundos." },
      { id: "identidad_historia", numero: "1.4", tipo: "textarea", label: "¿Hace cuánto existe y cómo nació?", placeholder: "Hito fundacional, motivación inicial, fecha aproximada..." },
      { id: "identidad_proposito", numero: "1.5", tipo: "textarea", label: "Misión, visión o propósito", hint: "Si no lo tienes escrito, cuéntalo con tus palabras." },
      { id: "identidad_valores", numero: "1.6", tipo: "textarea", label: "Valores que guían tu trabajo (3 a 5)", placeholder: "Ej: cuidado, comunidad, evidencia, calma..." },
      { id: "identidad_equipo", numero: "1.7", tipo: "textarea", label: "¿Quién está detrás?", hint: "Nombre, rol y bio breve de fundadores o equipo visible." },
    ],
  },
  {
    id: 2,
    titulo: "2. Público y propuesta de valor",
    preguntas: [
      { id: "publico_perfil", numero: "2.1", tipo: "textarea", label: "¿A quién se dirige?", hint: "Edad aproximada, contexto, momento vital, intereses." },
      { id: "publico_problema", numero: "2.2", tipo: "textarea", label: "¿Qué problema o necesidad resuelves para esa persona?" },
      { id: "publico_diferenciacion", numero: "2.3", tipo: "textarea", label: "¿Qué te diferencia de otros que ofrecen algo parecido?" },
      { id: "publico_transformacion", numero: "2.4", tipo: "textarea", label: "¿Qué transformación experimenta la persona al trabajar contigo?" },
      { id: "publico_testimonios", numero: "2.5", tipo: "textarea", label: "Testimonios disponibles", hint: "Pega 1 a 3 testimonios si los tienes (texto). Si tienes en video/audio, indícalo." },
    ],
  },
  {
    id: 3,
    titulo: "3. Oferta concreta",
    subtitulo: "Lo que la persona puede contratar o reservar",
    preguntas: [
      {
        id: "oferta_catalogo",
        numero: "3.1",
        tipo: "tabla",
        label: "Servicios, programas o productos",
        columnas: [
          { key: "nombre", label: "Nombre", tipo: "texto", placeholder: "Ej: Sesión individual", width: "30%" },
          { key: "formato", label: "Formato", tipo: "select", opciones: ["Online", "Presencial", "Híbrido"], width: "20%" },
          { key: "duracion", label: "Duración", tipo: "texto", placeholder: "60 min / 8 sesiones", width: "20%" },
          { key: "precio", label: "Precio (CLP)", tipo: "texto", placeholder: "45.000", width: "30%" },
        ],
        filaInicial: { nombre: "", formato: "", duracion: "", precio: "" },
      },
      { id: "oferta_ancla", numero: "3.2", tipo: "texto", label: "¿Cuál es el servicio o programa que quieres destacar primero?", placeholder: "Ej: Ciclo de 8 semanas" },
      { id: "oferta_paquetes", numero: "3.3", tipo: "textarea", label: "¿Tienes paquetes, membresías o suscripciones?", placeholder: "Descríbelas brevemente o pon \"No\"." },
      {
        id: "oferta_objetivo_web",
        numero: "3.4",
        tipo: "radio",
        label: "¿Qué quieres que haga la web?",
        opciones: [
          "Vender o agendar directamente",
          "Generar leads (que me escriban por WhatsApp / email)",
          "Solo presentar el proyecto (sin acción de compra)",
        ],
      },
      {
        id: "oferta_canal_actual",
        numero: "3.5",
        tipo: "checkboxes",
        label: "¿Cómo agendan o compran hoy?",
        opciones: ["WhatsApp", "Instagram DM", "Formulario", "Calendario online (Cal.com, Calendly)", "Pasarela de pago", "No hay canal aún"],
      },
    ],
  },
  {
    id: 4,
    titulo: "4. Identidad visual",
    preguntas: [
      {
        id: "visual_logo",
        numero: "4.1",
        tipo: "radio",
        label: "¿Tienes logo en formato vectorial (SVG, AI, PDF)?",
        opciones: ["Sí, lo enviaré por WhatsApp", "Tengo solo PNG/JPG", "No tengo logo, lo necesito"],
      },
      { id: "visual_colores", numero: "4.2", tipo: "texto", label: "Paleta de colores", hint: "Códigos HEX si los tienes (#1a1a1a, #4A9B93...) o descripción.", placeholder: "#0F1E3A, #4A9B93, #F2F0EB" },
      { id: "visual_tipografias", numero: "4.3", tipo: "texto", label: "Tipografías que usas en redes o materiales", placeholder: "Ej: Syne, Cormorant, DM Mono" },
      { id: "visual_referencias_si", numero: "4.4", tipo: "textarea", label: "3 sitios web que te gusten y por qué", placeholder: "Pega URLs + qué te gusta de cada uno." },
      { id: "visual_referencias_no", numero: "4.5", tipo: "textarea", label: "1 a 2 sitios que NO te gustan y por qué", placeholder: "URL + qué evitar." },
      {
        id: "visual_fotos",
        numero: "4.6",
        tipo: "radio",
        label: "¿Tienes banco de fotos propio?",
        opciones: [
          "Sí, tengo fotos profesionales (enviaré link a Drive)",
          "Tengo fotos de celular, sirven",
          "No tengo, necesito que se seleccionen o generen",
        ],
      },
      { id: "visual_tono", numero: "4.7", tipo: "texto", label: "Tono visual deseado en 3 palabras", placeholder: "Cálido, sobrio, espiritual, clínico, artesanal, minimalista..." },
    ],
  },
  {
    id: 5,
    titulo: "5. Tono y voz",
    preguntas: [
      {
        id: "voz_trato",
        numero: "5.1",
        tipo: "radio",
        label: "¿Cómo le hablas a tu cliente?",
        opciones: ["Tú, cercano e informal", "Tú, más formal", "Usted, formal"],
      },
      { id: "voz_palabras_si", numero: "5.2", tipo: "textarea", label: "Palabras o expresiones que SIEMPRE usas", placeholder: "Ej: respirar, círculo, presencia, cuerpo..." },
      { id: "voz_palabras_no", numero: "5.3", tipo: "textarea", label: "Palabras o expresiones que NUNCA usarías", placeholder: "Ej: \"cliente\", \"paciente\", emojis, tecnicismos..." },
      { id: "voz_ejemplo", numero: "5.4", tipo: "textarea", label: "Pega un texto tuyo que sientas \"100% tu voz\"", hint: "Copia un post de Instagram, un email, un párrafo de presentación." },
    ],
  },
  {
    id: 6,
    titulo: "6. Estructura del sitio",
    preguntas: [
      {
        id: "sitio_paginas",
        numero: "6.1",
        tipo: "checkboxes",
        label: "Páginas que necesitas (marca todas las que apliquen)",
        opciones: [
          "Inicio",
          "Sobre mí / nosotros",
          "Servicios o programas",
          "Página de un programa específico",
          "Blog o recursos",
          "Testimonios",
          "Contacto",
          "Agenda",
          "Tienda",
          "Recursos descargables",
          "Área privada para clientes/alumnos",
          "Otro",
        ],
      },
      {
        id: "sitio_accion_principal",
        numero: "6.2",
        tipo: "radio",
        label: "¿Qué quieres que la persona haga al entrar a la home?",
        opciones: [
          "Agendar una sesión / hora",
          "Leer y conocer el proyecto",
          "Suscribirse a algo gratis",
          "Comprar un programa o producto",
          "Escribir por WhatsApp",
        ],
      },
      {
        id: "sitio_textos",
        numero: "6.3",
        tipo: "radio",
        label: "¿Tienes textos ya escritos?",
        opciones: ["Sí, todo escrito", "Tengo borradores", "Partimos en blanco, necesito apoyo"],
      },
      {
        id: "sitio_blog",
        numero: "6.4",
        tipo: "radio",
        label: "¿Quieres blog o sección de recursos?",
        opciones: ["Sí, publicaría seguido (semanal/quincenal)", "Sí, ocasionalmente", "No por ahora"],
      },
      { id: "sitio_cta", numero: "6.5", tipo: "textarea", label: "Frases que sientes que convencen a tu cliente", placeholder: "Ej: \"Agenda tu primera sesión\", \"Vuelve a respirar\"..." },
    ],
  },
  {
    id: 7,
    titulo: "7. Captación y conversión",
    preguntas: [
      {
        id: "captacion_pide",
        numero: "7.1",
        tipo: "checkboxes",
        label: "¿Qué quieres pedirle al visitante?",
        opciones: ["Email", "WhatsApp", "Agendar una hora", "Descargar algo gratis", "Comprar"],
      },
      { id: "captacion_lead_magnet", numero: "7.2", tipo: "textarea", label: "¿Ofreces algo gratis a cambio del contacto?", placeholder: "Ej: PDF, mini-curso, sesión exploratoria, guía. Si no, pon \"No\"." },
      { id: "captacion_email", numero: "7.3", tipo: "texto", label: "Email donde quieres recibir los leads", placeholder: "hola@minegocio.cl" },
      { id: "captacion_wsp", numero: "7.4", tipo: "tel", label: "WhatsApp donde quieres recibir los leads", placeholder: "56912345678" },
      {
        id: "captacion_email_tool",
        numero: "7.5",
        tipo: "select",
        label: "¿Usas alguna plataforma de email marketing?",
        opciones: ["Mailerlite", "Mailchimp", "ConvertKit", "Brevo", "Otra", "No uso"],
      },
    ],
  },
  {
    id: 8,
    titulo: "8. Operación y técnica",
    preguntas: [
      {
        id: "tec_dominio",
        numero: "8.1",
        tipo: "radio",
        label: "Dominio (URL)",
        opciones: ["Ya lo tengo comprado", "No lo tengo, lo compro yo", "Necesito que lo compre Operaria"],
      },
      { id: "tec_dominio_url", numero: "8.2", tipo: "texto", label: "¿Cuál es o cuál quieres que sea?", placeholder: "circulorespira.cl" },
      {
        id: "tec_hosting",
        numero: "8.3",
        tipo: "radio",
        label: "Hosting",
        opciones: ["Tengo hosting actual y quiero migrar", "Partimos limpio en Vercel (recomendado)", "No sé qué es esto"],
      },
      { id: "tec_redes", numero: "8.4", tipo: "textarea", label: "Links de tus redes sociales", placeholder: "instagram.com/...\nyoutube.com/..." },
      {
        id: "tec_analytics",
        numero: "8.5",
        tipo: "checkboxes",
        label: "Métricas activas hoy",
        opciones: ["Google Analytics", "Meta Pixel", "Otra", "Ninguna"],
      },
      {
        id: "tec_integraciones",
        numero: "8.6",
        tipo: "checkboxes",
        label: "Integraciones que necesitas",
        opciones: [
          "Calendario (Cal.com / Calendly)",
          "Pasarela de pago (Flow, MercadoPago, Transbank)",
          "Stripe (cobro internacional)",
          "CRM (HubSpot, Notion, otro)",
          "WhatsApp Business",
          "Email marketing",
          "Ninguna por ahora",
        ],
      },
      {
        id: "tec_idiomas",
        numero: "8.7",
        tipo: "radio",
        label: "Idiomas del sitio",
        opciones: ["Solo español", "Español + inglés", "Multi-idioma (3+)"],
      },
      {
        id: "tec_area_privada",
        numero: "8.8",
        tipo: "radio",
        label: "¿Necesitas área privada con login para clientes/alumnos?",
        opciones: ["Sí, desde el inicio", "Quizás en una fase 2", "No"],
      },
    ],
  },
  {
    id: 9,
    titulo: "9. Legal y administrativo",
    preguntas: [
      { id: "legal_razon_social", numero: "9.1", tipo: "texto", label: "Razón social", placeholder: "Ej: Círculo Respira SpA" },
      { id: "legal_rut", numero: "9.2", tipo: "texto", label: "RUT", placeholder: "76.123.456-7" },
      { id: "legal_direccion", numero: "9.3", tipo: "texto", label: "Dirección de facturación (para footer/legales)", placeholder: "Comuna, ciudad" },
      {
        id: "legal_politicas",
        numero: "9.4",
        tipo: "radio",
        label: "¿Tienes políticas de privacidad y términos?",
        opciones: ["Sí, las tengo", "No, las redacta Operaria", "No las necesito"],
      },
      {
        id: "legal_datos_sensibles",
        numero: "9.5",
        tipo: "radio",
        label: "¿Manejas datos sensibles (salud, menores, financieros)?",
        opciones: ["Sí, salud", "Sí, otros", "No"],
      },
    ],
  },
  {
    id: 10,
    titulo: "10. Tiempos y expectativas",
    preguntas: [
      { id: "tiempo_fecha", numero: "10.1", tipo: "texto", label: "Fecha ideal de publicación", placeholder: "Ej: 15 de julio 2026" },
      { id: "tiempo_hito", numero: "10.2", tipo: "textarea", label: "¿Hay un hito asociado?", placeholder: "Lanzamiento de programa, evento, temporada..." },
      {
        id: "tiempo_presupuesto",
        numero: "10.3",
        tipo: "select",
        label: "Rango de presupuesto disponible (CLP)",
        opciones: [
          "Menos de 500.000",
          "500.000 – 1.000.000",
          "1.000.000 – 2.500.000",
          "2.500.000 – 5.000.000",
          "Más de 5.000.000",
          "Prefiero conversarlo",
        ],
      },
      { id: "tiempo_contraparte", numero: "10.4", tipo: "texto", label: "¿Quién aprueba avances?", hint: "Idealmente una sola persona.", placeholder: "Nombre y rol" },
      {
        id: "tiempo_cadencia",
        numero: "10.5",
        tipo: "radio",
        label: "Frecuencia de revisión deseada",
        opciones: ["Semanal", "Cada 2 semanas", "Por hito (cuando hay algo que aprobar)"],
      },
    ],
  },
  {
    id: 11,
    titulo: "11. Pregunta abierta",
    preguntas: [
      { id: "abierta_6_meses", numero: "11.1", tipo: "textarea", label: "Si esta web hiciera UNA cosa muy bien en 6 meses, ¿qué sería?" },
      { id: "abierta_comentario", numero: "11.2", tipo: "textarea", label: "¿Algo más que quieras contarnos antes de empezar?" },
    ],
  },
];

export function webValidarAlEnviar(respuestas: Respuestas): string | null {
  if (!respuestas.id_nombre) return "Necesitamos tu nombre (bloque inicial).";
  if (!respuestas.id_email) return "Necesitamos tu email para enviarte la propuesta.";
  if (!respuestas.identidad_nombre) return "Falta el nombre del proyecto (Bloque 1).";
  if (!respuestas.identidad_pitch) return "Falta el pitch del proyecto (Bloque 1.3).";
  if (!respuestas.publico_perfil) return "Cuéntanos a quién se dirige el proyecto (Bloque 2.1).";
  if (!respuestas.oferta_objetivo_web) return "Elige el objetivo principal de la web (Bloque 3.4).";
  return null;
}
