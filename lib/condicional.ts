import type { MostrarSi, Respuestas } from "./types";

function evaluarUna(cond: MostrarSi, respuestas: Respuestas): boolean {
  const v = respuestas[cond.id];
  if (cond.igual !== undefined) {
    return v === cond.igual;
  }
  if (cond.distintoDe !== undefined) {
    return v !== cond.distintoDe;
  }
  if (cond.incluye !== undefined) {
    if (Array.isArray(v) && (v as string[]).includes(cond.incluye)) return true;
    if (v && typeof v === "object" && "seleccion" in (v as object)) {
      const obj = v as { seleccion: string[] };
      return obj.seleccion.includes(cond.incluye);
    }
    return false;
  }
  return true;
}

export function debeMostrar(
  mostrarSi: MostrarSi | MostrarSi[] | undefined,
  respuestas: Respuestas,
): boolean {
  if (!mostrarSi) return true;
  if (Array.isArray(mostrarSi)) {
    return mostrarSi.every((c) => evaluarUna(c, respuestas));
  }
  return evaluarUna(mostrarSi, respuestas);
}
