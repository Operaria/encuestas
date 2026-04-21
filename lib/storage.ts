import type { Respuestas } from "./types";

export const storageKey = (slug: string) => `operaria-diagnostico-${slug}`;

export function loadRespuestas(slug: string): { respuestas: Respuestas; savedAt: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey(slug));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

export function saveRespuestas(slug: string, respuestas: Respuestas): number {
  const savedAt = Date.now();
  localStorage.setItem(storageKey(slug), JSON.stringify({ respuestas, savedAt }));
  return savedAt;
}

export function clearRespuestas(slug: string) {
  localStorage.removeItem(storageKey(slug));
}
