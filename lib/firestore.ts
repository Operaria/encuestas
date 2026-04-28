import { Firestore } from "@google-cloud/firestore";

export type Modalidad = "pagante" | "sin_cobro";

export type ConexionEstado = "conectado" | "pendiente" | "operaria_lo_crea" | "no_aplica";

export type ClienteDoc = {
  slug: string;
  nombre_negocio: string;
  entrada_contratada: string;
  modalidad: Modalidad;
  tiene_whatsapp_business: boolean;
  tiene_mercadopago: boolean;
  requiere_creacion_google: boolean;
  meta_estado?: ConexionEstado;
  mp_estado?: ConexionEstado;
  google_estado?: ConexionEstado;
};

let _db: Firestore | null = null;

function db(): Firestore {
  if (_db) return _db;
  const projectId = process.env.GCP_PROJECT_ID || "operaria-flow";
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    const credentials = JSON.parse(
      raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8")
    );
    _db = new Firestore({ projectId, credentials });
  } else {
    _db = new Firestore({ projectId });
  }
  return _db;
}

export async function getCliente(slug: string): Promise<ClienteDoc | null> {
  const snap = await db().collection("clientes").doc(slug).get();
  if (!snap.exists) return null;
  return { slug, ...(snap.data() as Omit<ClienteDoc, "slug">) };
}
