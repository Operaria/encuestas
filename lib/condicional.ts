import type { MostrarSi, Respuestas } from "./types";

export function debeMostrar(mostrarSi: MostrarSi | undefined, respuestas: Respuestas): boolean {
  if (!mostrarSi) return true;
  const v = respuestas[mostrarSi.id];
  if (mostrarSi.igual !== undefined) {
    if (v === mostrarSi.igual) return true;
    return false;
  }
  if (mostrarSi.distintoDe !== undefined) {
    return v !== mostrarSi.distintoDe;
  }
  if (mostrarSi.incluye !== undefined) {
    if (Array.isArray(v) && (v as string[]).includes(mostrarSi.incluye)) return true;
    if (v && typeof v === "object" && "seleccion" in (v as object)) {
      const obj = v as { seleccion: string[] };
      return obj.seleccion.includes(mostrarSi.incluye);
    }
    return false;
  }
  return true;
}
