export type TipoPregunta =
  | "texto"
  | "textarea"
  | "checkboxes"
  | "slider"
  | "tel"
  | "number"
  | "radio"
  | "select"
  | "tabla";

export interface ColumnaTabla {
  key: string;
  label: string;
  tipo: "texto" | "number" | "select";
  placeholder?: string;
  opciones?: string[];
  width?: string;
}

export interface Pregunta {
  id: string;
  numero?: string;
  tipo: TipoPregunta;
  label: string;
  hint?: string;
  placeholder?: string;
  opciones?: string[];
  min?: number;
  max?: number;
  labelMin?: string;
  labelMax?: string;
  columnas?: ColumnaTabla[];
  filaInicial?: Record<string, string>;
}

export interface Bloque {
  id: number;
  titulo: string;
  subtitulo?: string;
  intro?: string;
  preguntas: Pregunta[];
}

export type TablaFila = Record<string, string>;

export type RespuestaValor =
  | string
  | string[]
  | number
  | { seleccion: string[]; otro?: string }
  | TablaFila[];

export type Respuestas = Record<string, RespuestaValor>;

export interface SubmitPayload {
  cliente: string;
  nombreFormateado: string;
  vertical?: string;
  respuestas: Respuestas;
  timestamp: string;
}
