import type { Bloque, Respuestas } from "../types";
import { bloques as genericoBloques, BLOQUE_DOLOR_IDS } from "../preguntas";
import { barberBloques, barberValidarAlEnviar } from "./barber";
import { webBloques, webValidarAlEnviar } from "./web";

export interface Vertical {
  id: string;
  nombreEncuesta: string;
  bloques: Bloque[];
  dolorIds?: string[];
  validarAlEnviar?: (respuestas: Respuestas) => string | null;
  /** Sub-marca debajo de "Operaria". Ej: "Flow", "Studio". Default "Flow". */
  marca?: string;
  /** Eyebrow superior. Ej: "Manos a la ópera", "¡A brillar!". */
  tagline?: string;
  /** Bajada bajo el título de la encuesta. */
  subtitulo?: string;
  /** Frase de cierre al final del cuestionario. */
  cierre?: string;
}

export const verticals: Record<string, Vertical> = {
  generico: {
    id: "generico",
    nombreEncuesta: "Encuesta de Levantamiento",
    bloques: genericoBloques,
    dolorIds: BLOQUE_DOLOR_IDS,
  },
  barber: {
    id: "barber",
    nombreEncuesta: "Levantamiento — BarberIA360°",
    bloques: barberBloques,
    validarAlEnviar: barberValidarAlEnviar,
  },
  web: {
    id: "web",
    nombreEncuesta: "Tu página web",
    bloques: webBloques,
    validarAlEnviar: webValidarAlEnviar,
    marca: "Studio",
    tagline: "¡A brillar!",
    subtitulo: "Cuéntanos lo esencial y nos hacemos cargo del resto.",
    cierre: "Listos para hacer brillar tu proyecto.",
  },
};

export function getVertical(id: string): Vertical {
  return verticals[id] ?? verticals.generico;
}
