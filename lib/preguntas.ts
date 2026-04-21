import type { Bloque } from "./types";

export const bloques: Bloque[] = [
  {
    id: 1,
    titulo: "1. Tu contexto",
    subtitulo: "3 minutos",
    intro: "Queremos entender quién eres y cómo trabajas hoy.",
    preguntas: [
      { id: "p1", numero: "1.1", tipo: "texto", label: "Nombre y cargo" },
      { id: "p2", numero: "1.2", tipo: "texto", label: "Rubro o sector en el que trabajas" },
      { id: "p3", numero: "1.3", tipo: "textarea", label: "Describe en una frase qué haces en un día típico" },
      { id: "p4", numero: "1.4", tipo: "texto", label: "¿Trabajas solo/a o con equipo?", hint: "Si es equipo, ¿cuántas personas?" },
      {
        id: "p5", numero: "1.5", tipo: "checkboxes",
        label: "¿Qué herramientas usas todos los días?",
        opciones: [
          "Correo (Gmail / Outlook / otro)",
          "WhatsApp o mensajería",
          "Excel / Google Sheets",
          "Word / Google Docs",
          "Software específico de mi rubro",
          "Agenda o calendario digital",
          "Sistema de facturación o contabilidad",
          "CRM o base de clientes",
          "Otros",
        ],
      },
    ],
  },
  {
    id: 2,
    titulo: "2. Dónde duele",
    subtitulo: "6 minutos · el bloque más importante",
    intro: "Acá está el diagnóstico real. Tómate el tiempo que necesites.",
    preguntas: [
      { id: "p6", numero: "2.1", tipo: "textarea", label: "Si tuvieras que nombrar LA tarea que más te agota, aburre o te quita tiempo cada semana, ¿cuál sería?" },
      { id: "p7", numero: "2.2", tipo: "texto", label: "¿Cuántas veces por día o semana la haces?" },
      { id: "p8", numero: "2.3", tipo: "texto", label: "¿Cuánto tiempo te toma cada vez?" },
      { id: "p9", numero: "2.4", tipo: "textarea", label: "¿Qué pasa si no la haces o la haces mal?", hint: "Ej: se pierde un cliente, te reclama el jefe, hay multa, se atrasa todo" },
      { id: "p10", numero: "2.5", tipo: "textarea", label: "Cuéntame el paso a paso de cómo la haces hoy", hint: "Como si se lo explicaras a alguien nuevo. Escribe como hablas." },
      { id: "p11", numero: "2.6", tipo: "textarea", label: "¿Qué parte de ese proceso te frustra más?" },
      { id: "p12", numero: "2.7", tipo: "textarea", label: "¿Hay alguna parte donde siempre se cometen errores o se te olvida algo?" },
      { id: "p13", numero: "2.8", tipo: "textarea", label: "¿Depende de que otra persona te responda o haga algo primero?", hint: "¿Quién y en qué parte?" },
    ],
  },
  {
    id: 3,
    titulo: "3. Qué haces hoy y qué has intentado",
    subtitulo: "4 minutos",
    preguntas: [
      { id: "p14", numero: "3.1", tipo: "textarea", label: "¿Tienes plantillas, machotes o respuestas tipo que reutilices?", hint: "¿Dónde las guardas?" },
      { id: "p15", numero: "3.2", tipo: "textarea", label: "¿Has intentado antes automatizar o mejorar esto de alguna forma?", hint: "¿Qué pasó?" },
      { id: "p16", numero: "3.3", tipo: "textarea", label: "¿Qué decisiones tomas tú que SÍ o SÍ requieren criterio humano?", hint: "Que no podrían delegarse a un sistema" },
      { id: "p17", numero: "3.4", tipo: "textarea", label: "¿Qué información necesitas tener a mano para hacer bien esta tarea? ¿Dónde vive esa información hoy?", hint: "Tu cabeza, cuaderno, Excel, sistema, varios lugares..." },
      { id: "p18", numero: "3.5", tipo: "textarea", label: "Si mañana despertaras y esta tarea se hiciera sola (bien hecha), ¿qué harías con ese tiempo liberado?" },
    ],
  },
  {
    id: 4,
    titulo: "4. Para cerrar",
    subtitulo: "1 minuto",
    preguntas: [
      { id: "p19", numero: "4.1", tipo: "textarea", label: "¿Hay alguna tarea que NO quisieras automatizar aunque se pudiera?", hint: "¿Por qué?" },
      { id: "p20", numero: "4.2", tipo: "slider", label: "¿Cuánto cambiaría tu semana si resolviéramos este dolor?", min: 1, max: 10, labelMin: "casi nada", labelMax: "me cambia la vida" },
      { id: "p21", numero: "4.3", tipo: "texto", label: "¿Cuál es la mejor forma de contactarte para revisar juntos una propuesta?", hint: "Correo / WhatsApp / llamada / reunión presencial" },
    ],
  },
];

export const BLOQUE_DOLOR_IDS = ["p6","p7","p8","p9","p10","p11","p12","p13"];
