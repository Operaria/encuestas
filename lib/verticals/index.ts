import type { Bloque, Respuestas } from "../types";
import { bloques as genericoBloques, BLOQUE_DOLOR_IDS } from "../preguntas";
import { barberBloques, barberValidarAlEnviar } from "./barber";

export interface Vertical {
  id: string;
  nombreEncuesta: string;
  bloques: Bloque[];
  dolorIds?: string[];
  validarAlEnviar?: (respuestas: Respuestas) => string | null;
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
};

export function getVertical(id: string): Vertical {
  return verticals[id] ?? verticals.generico;
}
