export type TipoPregunta =
  | "texto"
  | "textarea"
  | "checkboxes"
  | "slider"
  | "tel"
  | "number"
  | "radio"
  | "select"
  | "tabla"
  | "boolean";

export interface MostrarSi {
  id: string;
  // La pregunta se muestra si la respuesta a `id` cumple alguna de estas condiciones
  igual?: string | number | boolean;
  distintoDe?: string | number | boolean;
  incluye?: string; // para checkboxes (struct {seleccion}) o arrays planos
}

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
  mostrarSi?: MostrarSi | MostrarSi[]; // array = AND (todas deben cumplirse)
  opcionesDe?: string; // para radio dinámico: usa la respuesta de otra pregunta como opciones
  maxLength?: number;
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
  | boolean
  | { seleccion: string[]; otro?: string }
  | TablaFila[];

export type Respuestas = Record<string, RespuestaValor>;

export interface SubmitPayload {
  cliente: string;
  nombreFormateado: string;
  negocio?: string;
  vertical?: string;
  respuestas: Respuestas;
  timestamp: string;
}
