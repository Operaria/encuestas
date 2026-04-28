import type { Bloque, Respuestas, CardOption } from "../types";

// Enums entrada_deseada (Bloque 7 v2)
export const ENTRADA_SOLO_AGENDA = "solo_agenda";
export const ENTRADA_AGENDA_OPERACION = "agenda_operacion";
export const ENTRADA_BARBER360 = "barber360";

// Mapping enum → label legible (PDF, email, Sheet humano)
export const entradaLabels: Record<string, string> = {
  [ENTRADA_SOLO_AGENDA]: "Solo Agenda",
  [ENTRADA_AGENDA_OPERACION]: "Agenda + Operación",
  [ENTRADA_BARBER360]: "BarberIA360° (paquete completo)",
};

// Label exacto de la opción "No tengo cuenta Google" (Bloque 6)
// — el orquestador deriva flag requiere_creacion_google de aquí
export const OPT_NO_TENGO_GOOGLE = "No tengo cuenta Google — Operaria me la crea como parte del setup";

const cardsEntradaDeseada: CardOption[] = [
  {
    value: ENTRADA_SOLO_AGENDA,
    titulo: "Solo Agenda",
    badge: "El primer encendido",
    setup: "Setup CLP 60.000",
    mrr: "MRR CLP 45.000/mes",
    descripcion: "Tu Agente agenda, recuerda y confirma.",
  },
  {
    value: ENTRADA_AGENDA_OPERACION,
    titulo: "Agenda + Operación",
    badge: "+ AUDIOS",
    setup: "Setup CLP 120.000",
    mrr: "MRR CLP 60.000/mes",
    descripcion: "Sumas comandos del dueño, audios, lista de espera y cierre nocturno.",
  },
  {
    value: ENTRADA_BARBER360,
    titulo: "BarberIA360°",
    badge: "+ COBRO + REPORTES + VISIÓN",
    setup: "Setup CLP 180.000",
    mrr: "MRR CLP 90.000/mes",
    descripcion: "El paquete completo · 9 bloques activos. Cobro digital, boletas, métricas mensuales.",
    destacado: true,
  },
];

// Labels canónicos (se usan como valores guardados y como claves de mostrarSi)
const OPT_TRANSFERENCIA = "Transferencia bancaria";
const OPT_PASARELA = "Pasarela de pago online — Transbank, Flow, Mercado Pago, Khipu, Getnet";
const OPT_EFECTIVO = "Efectivo";
const OPT_OTRO = "Otro";

export const barberBloques: Bloque[] = [
  {
    id: 0,
    titulo: "Tus datos",
    subtitulo: "Para contactarte con tu propuesta personalizada",
    preguntas: [
      { id: "id_nombre", tipo: "texto", label: "Tu nombre", placeholder: "Ej: José Bravo" },
      { id: "id_telefono", tipo: "tel", label: "Tu WhatsApp", hint: "Solo dígitos con código país, sin \"+\". Ej: 56912345678", placeholder: "56912345678" },
      { id: "id_email", tipo: "texto", label: "Tu email (opcional)", placeholder: "jose@minegocio.cl" },
    ],
  },
  {
    id: 1,
    titulo: "1. Sobre tu negocio",
    subtitulo: "Queremos entender cómo operas hoy antes de proponerte cómo automatizarlo",
    preguntas: [
      { id: "contexto_servicios_agendables", numero: "1.1", tipo: "textarea", label: "¿Todos los servicios que ofreces se agendan, o algunos son espontáneos?", placeholder: "Ej: todos se agendan; o el corte se agenda pero la barba es al paso..." },
      {
        id: "contexto_canales", numero: "1.2", tipo: "checkboxes",
        label: "¿Por qué vía recibes más mensajes o consultas?",
        opciones: ["WhatsApp", "Instagram", "Llamada telefónica", "Presencial", "Otro"],
      },
      { id: "contexto_responde_tiempo", numero: "1.3", tipo: "textarea", label: "¿Alcanzas siempre a responder los mensajes a tiempo?", placeholder: "Sí / a veces / casi nunca, y por qué..." },
      { id: "contexto_herramienta_actual", numero: "1.4", tipo: "textarea", label: "¿Cómo organizas agenda, clientes y pagos hoy?", hint: "Papel, cuaderno, planilla Excel, app de agenda, memoria, mezcla..." },
      { id: "contexto_apoyo", numero: "1.5", tipo: "textarea", label: "¿Hay alguien que te apoye con parte del trabajo?", placeholder: "Familia, asistente, equipo, solo..." },
      { id: "contexto_volumen_diario", numero: "1.6", tipo: "texto", label: "Aproximadamente, ¿cuántos mensajes o consultas recibes en un día normal?", placeholder: "Ej: 15-20" },
      { id: "contexto_principal_dolor", numero: "1.7", tipo: "textarea", label: "¿Qué parte de tu trabajo diario te quita más tiempo o energía?" },
      { id: "contexto_pierde_clientes", numero: "1.8", tipo: "textarea", label: "¿Pierdes clientes por no responder a tiempo? ¿Cuántos aproximadamente al mes?", placeholder: "Ej: 5 a 10 al mes; no tengo claro pero pasa seguido..." },
      { id: "contexto_momento_critico", numero: "1.9", tipo: "textarea", label: "¿En qué momento tu día se vuelve más ajetreado?" },
      { id: "contexto_delegar", numero: "1.10", tipo: "textarea", label: "Si pudieras tener un asistente que se encargara de algo por ti, ¿qué le delegarías primero?" },
      { id: "contexto_comentario_libre", numero: "1.11", tipo: "textarea", label: "¿Hay algo más que quieras contarnos sobre cómo funciona tu negocio?" },
    ],
  },
  {
    id: 2,
    titulo: "2. Catálogo de servicios",
    subtitulo: "Cada servicio que ofreces, cuánto demora y cuánto cobras. Sin esto tu Agente no puede agendar.",
    preguntas: [
      {
        id: "reserva_gratuita",
        tipo: "boolean",
        label: "Mi negocio no cobra por reservar (reserva gratuita, el cliente paga consumo en el local).",
        placeholder: "Sí, la reserva es gratuita",
      },
      {
        id: "ticket_promedio_consumo_clp",
        tipo: "number",
        label: "Ticket promedio de consumo por cliente en el local (CLP)",
        placeholder: "Ej: 12000",
        mostrarSi: { id: "reserva_gratuita", igual: true },
      },
      {
        id: "catalogo",
        tipo: "tabla",
        label: "Servicios",
        columnas: [
          { key: "servicio", label: "Servicio", tipo: "texto", placeholder: "Ej: Corte clásico", width: "35%" },
          { key: "duracion", label: "Duración (min)", tipo: "number", placeholder: "30", width: "18%" },
          { key: "precio", label: "Precio (CLP)", tipo: "number", placeholder: "8000", width: "20%" },
          { key: "requiere_prof", label: "Requiere profesional", tipo: "select", opciones: ["No", "Sí"], width: "27%" },
        ],
        filaInicial: { servicio: "", duracion: "", precio: "", requiere_prof: "" },
        mostrarSi: { id: "reserva_gratuita", distintoDe: true },
      },
    ],
  },
  {
    id: 3,
    titulo: "3. Equipo y horarios",
    preguntas: [
      { id: "equipo_profesionales", numero: "3.1", tipo: "texto", label: "¿Quiénes atienden en el negocio?", hint: "Nombres, separados por coma.", placeholder: "Ej: Diego, Matías" },
      { id: "equipo_especialidades", numero: "3.2", tipo: "textarea", label: "¿Qué hace cada uno? ¿Tienen especialidades?", placeholder: "Ej: Diego hace todo. Matías solo corte y barba." },
      { id: "equipo_horario_negocio", numero: "3.3", tipo: "texto", label: "Horario general del negocio", placeholder: "Ej: Lun a Sáb 10:00–20:00, Dom cerrado" },
      { id: "equipo_horario_staff", numero: "3.4", tipo: "textarea", label: "¿Algún profesional tiene un horario distinto al general?", placeholder: "Ej: Matías solo Lun a Vie. Diego atiende todos los días." },
      { id: "equipo_bloques_fijos", numero: "3.5", tipo: "texto", label: "Descansos o bloques fijos (colación, etc.)", placeholder: "Ej: 13:00–14:00 colación todos los días" },
      {
        id: "equipo_agenda_modo", numero: "3.6", tipo: "radio",
        label: "¿Cómo ordenas la agenda?",
        hint: "Esto define cómo tu Agente ofrece horas disponibles.",
        opciones: [
          "Por segmentos fijos (ej: bloques de 30 min predefinidos)",
          "Abierta, se va llenando según la duración del servicio agendado",
          "Mixto / no estoy seguro",
        ],
      },
      { id: "equipo_agenda_detalle", numero: "3.7", tipo: "textarea", label: "Si es mixto o hay reglas especiales, cuéntanos", placeholder: "Ej: en la mañana bloques fijos, en la tarde abierta..." },
    ],
  },
  {
    id: 4,
    titulo: "4. Pagos y reglas del negocio",
    preguntas: [
      {
        id: "medios_pago_aceptados",
        numero: "4.1",
        tipo: "checkboxes",
        label: "¿Qué medios de pago aceptas hoy? (marca todos los que apliquen)",
        opciones: [
          OPT_TRANSFERENCIA,
          OPT_PASARELA,
          OPT_EFECTIVO,
          OPT_OTRO,
        ],
      },
      // --- Transferencia ---
      {
        id: "transferencia_banco",
        tipo: "texto",
        label: "Banco",
        placeholder: "Ej: Banco de Chile",
        mostrarSi: { id: "medios_pago_aceptados", incluye: OPT_TRANSFERENCIA },
      },
      {
        id: "transferencia_tipo_cuenta",
        tipo: "select",
        label: "Tipo de cuenta",
        opciones: ["Cuenta Corriente", "Cuenta Vista", "Cuenta RUT", "Cuenta de Ahorro", "Otra"],
        mostrarSi: { id: "medios_pago_aceptados", incluye: OPT_TRANSFERENCIA },
      },
      {
        id: "transferencia_numero_cuenta",
        tipo: "texto",
        label: "Número de cuenta",
        mostrarSi: { id: "medios_pago_aceptados", incluye: OPT_TRANSFERENCIA },
      },
      {
        id: "transferencia_rut",
        tipo: "texto",
        label: "RUT del titular",
        placeholder: "Ej: 12.345.678-9",
        mostrarSi: { id: "medios_pago_aceptados", incluye: OPT_TRANSFERENCIA },
      },
      {
        id: "transferencia_nombre_titular",
        tipo: "texto",
        label: "Nombre del titular",
        mostrarSi: { id: "medios_pago_aceptados", incluye: OPT_TRANSFERENCIA },
      },
      {
        id: "transferencia_email_notificacion",
        tipo: "texto",
        label: "Correo donde te llegan los avisos de transferencia (opcional)",
        hint: "Si tienes un QR bancario para transferir, nos lo puedes enviar por WhatsApp al finalizar la encuesta.",
        mostrarSi: { id: "medios_pago_aceptados", incluye: OPT_TRANSFERENCIA },
      },
      // --- Pasarela ---
      {
        id: "pasarela_deseada",
        tipo: "select",
        label: "¿Qué pasarela de pago prefieres integrar?",
        opciones: ["Transbank", "Flow", "Mercado Pago", "Khipu", "Getnet", "Otro", "No sé aún"],
        mostrarSi: { id: "medios_pago_aceptados", incluye: OPT_PASARELA },
      },
      // --- Otro medio ---
      {
        id: "medio_pago_otro",
        tipo: "texto",
        label: "¿Cuál?",
        mostrarSi: { id: "medios_pago_aceptados", incluye: OPT_OTRO },
      },
      // --- Reglas del negocio (existentes) ---
      {
        id: "pagos_cobro_adelantado",
        numero: "4.2",
        tipo: "radio",
        label: "¿Cobras por adelantado?",
        opciones: ["No", "Sí, todo", "Parcial (abono)"],
      },
      { id: "pagos_politica_cancelacion", numero: "4.3", tipo: "textarea", label: "Política de cancelación", hint: "¿Con cuánta anticipación debe avisar? ¿Hay penalización?" },
      { id: "pagos_politica_noshow", numero: "4.4", tipo: "textarea", label: "¿Qué haces hoy con los clientes que no llegan a su cita?", placeholder: "Ej: hoy nada; me gustaría cobrar la mitad la próxima vez..." },
      { id: "pagos_reagendamiento", numero: "4.5", tipo: "texto", label: "¿Cuántas veces permites que un cliente reagende sin costo?", placeholder: "Ej: 1 vez sin costo, después se cobra abono" },
      {
        id: "hora_cierre_nocturno",
        numero: "4.6",
        tipo: "time",
        label: "¿A qué hora prefieres recibir tu cierre de caja diario por WhatsApp?",
        hint: "Default 21:00. Lo puedes ajustar después con un mensaje a tu Agente.",
        defaultValor: "21:00",
      },
      // --- Confirmación transferencia (condicional compuesta: transferencia + entrada=barber360) ---
      {
        id: "confirmacion_transferencia",
        numero: "4.7",
        tipo: "radio",
        label: "Para los pagos por transferencia, ¿cómo prefieres confirmarlos?",
        opciones: [
          "Yo confirmo manualmente por WhatsApp cuando veo la transferencia",
          "El cliente sube el comprobante y yo lo apruebo antes de emitir boleta",
          "Confío en el cliente: al recibir el comprobante, mi Agente lo asume confirmado",
        ],
        mostrarSi: [
          { id: "medios_pago_aceptados", incluye: OPT_TRANSFERENCIA },
          { id: "entrada_deseada", igual: ENTRADA_BARBER360 },
        ],
      },
    ],
  },
  {
    id: 5,
    titulo: "5. Voz y tono de tu Agente",
    subtitulo: "Tu Agente se presenta como parte de tu equipo, con nombre propio",
    preguntas: [
      {
        id: "voz_trato", numero: "5.1", tipo: "radio",
        label: "¿Cómo tratas a tus clientes?",
        opciones: ["Tú, informal y cercano", "Tú, pero más formal", "Usted, formal"],
      },
      { id: "voz_frases_tipicas", numero: "5.2", tipo: "textarea", label: "Frases o muletillas típicas que uses con tus clientes", hint: "Cómo saludas, cómo confirmas, cómo te despides.", placeholder: "Ej: \"Listo compa\", \"Te espero\", \"Dale, pasa\"" },
      { id: "voz_nombre_bot", numero: "5.3", tipo: "texto", label: "¿Qué nombre quieres para tu Agente?", hint: "Se presentará como parte del equipo: \"Hola, soy [Nombre] de BarberIA360°\".", placeholder: "Ej: Juan" },
      { id: "voz_tono", numero: "5.4", tipo: "texto", label: "Tono general en una frase", placeholder: "Ej: Cercano, relajado, de barrio" },
      { id: "voz_restricciones", numero: "5.5", tipo: "textarea", label: "¿Qué NO quieres que diga tu Agente o cómo NO quieres que suene?", placeholder: "Ej: Nada formal, no \"estimado\", no emojis..." },
    ],
  },
  {
    id: 6,
    titulo: "6. Acceso técnico",
    preguntas: [
      {
        id: "sistema_agenda_actual",
        numero: "6.1",
        tipo: "select",
        label: "¿Qué sistema de agenda usas hoy?",
        opciones: [
          "Reservo",
          "Fresha",
          "Agendapro",
          "Booksy",
          "Google Workspace (Calendar)",
          "Gmail (Calendar)",
          "iCloud (Calendar)",
          "Outlook (Calendar)",
          "Otro",
          "Ninguno",
        ],
      },
      {
        id: "sistema_agenda_otro",
        tipo: "texto",
        label: "¿Cuál?",
        placeholder: "Nombre del sistema",
        mostrarSi: { id: "sistema_agenda_actual", igual: "Otro" },
      },
      {
        id: "tecnico_wsp_tipo", numero: "6.2", tipo: "radio",
        label: "¿Qué tipo de WhatsApp usas para el negocio?",
        opciones: [
          "Business, dedicado",
          "Business, compartido con personal",
          "Personal (no tengo Business)",
          "No tengo WhatsApp del negocio",
        ],
      },
      { id: "tecnico_wsp_numero", numero: "6.3", tipo: "tel", label: "Número de WhatsApp a conectar", hint: "Solo dígitos con código país, sin \"+\". Ej: 56912345678", placeholder: "56912345678" },
      {
        id: "tecnico_google_account", numero: "6.4", tipo: "radio",
        label: "¿Tienes cuenta de Google (Gmail) del negocio?",
        opciones: ["Sí, del negocio", "Uso mi Gmail personal", OPT_NO_TENGO_GOOGLE],
      },
      { id: "tecnico_google_email", numero: "6.5", tipo: "texto", label: "Email (si lo usas para el negocio)", placeholder: "negocio@gmail.com" },
      {
        id: "tecnico_migrar_google", numero: "6.6", tipo: "radio",
        label: "¿Te gustaría tener todo centralizado en Google? (Agenda, planillas, correo, gratis y conectado. Nosotros ayudamos a migrar.)",
        opciones: ["Sí, quiero migrar", "Ya uso Google", "No por ahora"],
      },
      { id: "tecnico_pasarela", numero: "6.7", tipo: "texto", label: "¿Tienes pasarela de pago? (Mercado Pago, Flow, Transbank...)", placeholder: "Ej: Mercado Pago / No tengo" },
      { id: "tecnico_otras_herramientas", numero: "6.8", tipo: "textarea", label: "¿Qué otras herramientas usas hoy para el negocio?", placeholder: "Ej: Excel para cuentas, Instagram para promoción..." },
      // --- Credenciales v2 (stack v3.1) ---
      {
        id: "tiene_whatsapp_business", numero: "6.9", tipo: "radio",
        label: "¿Tienes WhatsApp Business activo en tu negocio?",
        hint: "No te preocupes si no tienes — lo creamos por ti como parte del setup.",
        opciones: ["Sí", "No", "No sé"],
      },
      {
        id: "numero_whatsapp_dedicado", numero: "6.10", tipo: "radio",
        label: "¿En qué número de WhatsApp quieres que opere tu Agente?",
        hint: "Si no tienes o prefieres separar tu personal, te entregamos un chip dedicado Operaria.",
        opciones: [
          "Sí, mi número actual",
          "No, prefiero que me den uno nuevo",
          "No tengo número aún",
        ],
      },
      {
        id: "tiene_mercadopago", numero: "6.11", tipo: "radio",
        label: "¿Tienes cuenta MercadoPago activa para tu negocio?",
        hint: "Si no tienes, te ayudamos a crearla. La cuenta queda a tu nombre, no de Operaria.",
        opciones: ["Sí", "No", "No sé"],
        mostrarSi: { id: "entrada_deseada", igual: ENTRADA_BARBER360 },
      },
      {
        id: "tiene_google_business_profile", numero: "6.12", tipo: "radio",
        label: "¿Tu negocio tiene perfil de Google Business (aparece cuando alguien te busca en Google Maps)?",
        hint: "Si no tienes, te ayudamos a crearlo. Es gratis y permite recibir reseñas con un click.",
        opciones: ["Sí", "No", "No sé"],
        mostrarSi: { id: "entrada_deseada", igual: ENTRADA_BARBER360 },
      },
      {
        id: "tiene_instagram_business", numero: "6.13", tipo: "radio",
        label: "¿Tu negocio tiene cuenta Instagram Business?",
        hint: "Opcional. Si la conectas, tu Agente también responde por Instagram.",
        opciones: ["Sí", "No", "No quiero conectar Instagram"],
      },
      {
        id: "email_contador", numero: "6.14", tipo: "texto",
        label: "¿Quieres que tu contador tenga acceso al respaldo de cierres diarios?",
        hint: "Si dejas su email, configuramos acceso de lectura al Sheet Cierres 360 en tu Drive. Puedes agregarlo o quitarlo después.",
        placeholder: "contador@ejemplo.cl (opcional)",
      },
    ],
  },
  {
    id: 7,
    titulo: "7. ¿Cómo quieres encender tu Agente?",
    intro: "Tres entradas progresivas. Puedes empezar con una y subir cuando quieras.",
    preguntas: [
      {
        id: "entrada_deseada",
        numero: "7.1",
        tipo: "cards",
        label: "Elige tu entrada",
        cards: cardsEntradaDeseada,
        helper: "Puedes empezar con una entrada y subir cuando quieras. El upgrade no cobra setup nuevo.",
      },
    ],
  },
];

export function barberValidarAlEnviar(respuestas: Respuestas): string | null {
  const entrada = (respuestas.entrada_deseada as string | undefined) ?? "";
  const medios = ((respuestas.medios_pago_aceptados as { seleccion?: string[] } | undefined)?.seleccion) ?? [];

  if (!entrada) {
    return "Elige una entrada (Bloque 7) para enviar tu encuesta.";
  }

  // Campos de credenciales required en v2
  if (!respuestas.tiene_whatsapp_business) {
    return "Cuéntanos si tienes WhatsApp Business (Bloque 6).";
  }
  if (!respuestas.tecnico_google_account) {
    return "Cuéntanos si tienes cuenta Google (Bloque 6).";
  }
  if (!respuestas.numero_whatsapp_dedicado) {
    return "Cuéntanos en qué número quieres que opere tu Agente (Bloque 6).";
  }

  // email_contador opcional pero si está debe ser válido
  const emailContador = (respuestas.email_contador as string | undefined)?.trim() ?? "";
  if (emailContador && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailContador)) {
    return "El email del contador no parece válido. Revísalo o déjalo vacío.";
  }

  // hora_cierre_nocturno formato HH:MM
  const hora = (respuestas.hora_cierre_nocturno as string | undefined) ?? "";
  if (hora && !/^([01]\d|2[0-3]):[0-5]\d$/.test(hora)) {
    return "La hora de cierre debe estar en formato HH:MM (24h).";
  }

  // Si eligió BarberIA360° (incluye Cobro 360) necesita medios de pago
  if (entrada === ENTRADA_BARBER360 && medios.length === 0) {
    return "Para BarberIA360° necesitamos saber qué medios de pago aceptas hoy. Vuelve al bloque 4 y marca al menos uno.";
  }
  return null;
}
