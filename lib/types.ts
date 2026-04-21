export type TipoPregunta = "texto" | "textarea" | "checkboxes" | "slider";

export interface Pregunta {
  id: string;
  numero: string;
  tipo: TipoPregunta;
  label: string;
  hint?: string;
  opciones?: string[];
  min?: number;
  max?: number;
  labelMin?: string;
  labelMax?: string;
}

export interface Bloque {
  id: number;
  titulo: string;
  subtitulo: string;
  intro?: string;
  preguntas: Pregunta[];
}

export type RespuestaValor = string | string[] | number | { seleccion: string[]; otro?: string };
export type Respuestas = Record<string, RespuestaValor>;

export interface SubmitPayload {
  cliente: string;
  nombreFormateado: string;
  respuestas: Respuestas;
  timestamp: string;
}
