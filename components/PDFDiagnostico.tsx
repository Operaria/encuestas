import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Bloque, Respuestas, TablaFila } from "@/lib/types";
import { debeMostrar } from "@/lib/condicional";

const C = {
  navy: "#0F1E3A",
  teal: "#4A9B93",
  petrol: "#1B4D4A",
  body: "#3D4450",
  muted: "#9E9C96",
  border: "#D6D2CB",
  offwhite: "#F2F0EB",
};

const s = StyleSheet.create({
  page: { paddingTop: 80, paddingBottom: 60, paddingHorizontal: 50, fontSize: 10, color: C.body, fontFamily: "Helvetica" },
  header: { position: "absolute", top: 0, left: 0, right: 0, backgroundColor: C.navy, padding: 24 },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: 700 },
  headerSub: { color: C.teal, fontSize: 9, marginTop: 4, letterSpacing: 2 },
  meta: { flexDirection: "row", gap: 20, marginBottom: 20, paddingBottom: 10, borderBottom: `1pt solid ${C.border}` },
  metaItem: { fontSize: 10 },
  metaLabel: { color: C.muted, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 },
  metaValue: { color: C.navy, fontSize: 10, marginTop: 2 },
  bloqueTitulo: { color: C.teal, fontSize: 14, fontWeight: 700, marginTop: 18, marginBottom: 4, borderBottom: `1pt solid ${C.teal}`, paddingBottom: 4 },
  bloqueSub: { color: C.petrol, fontSize: 9, marginBottom: 10 },
  preguntaLabel: { color: C.navy, fontSize: 10, fontWeight: 600, marginTop: 10 },
  numero: { color: C.teal, fontSize: 9 },
  respuesta: { color: C.body, fontSize: 10, marginTop: 3, lineHeight: 1.5 },
  vacia: { color: C.muted, fontSize: 10, marginTop: 3, fontStyle: "italic" },
  footer: { position: "absolute", bottom: 24, left: 50, right: 50, flexDirection: "row", justifyContent: "space-between" },
  footerText: { color: C.muted, fontSize: 8 },
  tRow: { flexDirection: "row", borderBottom: `0.5pt solid ${C.border}` },
  tHeader: { backgroundColor: C.navy },
  tCell: { padding: 4, fontSize: 9, color: C.body },
  tCellHeader: { padding: 4, fontSize: 9, color: "#fff", fontWeight: 600 },
});

function formatRespuesta(v: unknown): string {
  if (v === undefined || v === null || v === "") return "";
  if (typeof v === "boolean") return v ? "Sí" : "No";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return "";
    if (typeof v[0] === "string") return (v as string[]).join(", ");
    return "";
  }
  if (typeof v === "object" && v !== null && "seleccion" in v) {
    const obj = v as { seleccion: string[]; otro?: string };
    const parts = [...obj.seleccion];
    if (obj.otro) parts.push(`Otros: ${obj.otro}`);
    return parts.join(", ");
  }
  return "";
}

interface Props {
  nombre: string;
  negocio?: string;
  fecha: string;
  bloques: Bloque[];
  respuestas: Respuestas;
  titulo?: string;
}

export function PDFDiagnostico({ nombre, negocio, fecha, bloques, respuestas, titulo }: Props) {
  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        <View style={s.header} fixed>
          <Text style={s.headerTitle}>{titulo ?? "Diagnóstico de Automatización"}</Text>
          <Text style={s.headerSub}>OPERARIA FLOW</Text>
        </View>

        <View style={s.meta}>
          <View style={s.metaItem}>
            <Text style={s.metaLabel}>Cliente</Text>
            <Text style={s.metaValue}>{nombre}</Text>
          </View>
          {negocio && negocio !== "—" && (
            <View style={s.metaItem}>
              <Text style={s.metaLabel}>Negocio</Text>
              <Text style={s.metaValue}>{negocio}</Text>
            </View>
          )}
          <View style={s.metaItem}>
            <Text style={s.metaLabel}>Fecha</Text>
            <Text style={s.metaValue}>{fecha}</Text>
          </View>
        </View>

        {bloques.map((b) => (
          <View key={b.id} wrap>
            <Text style={s.bloqueTitulo}>{b.titulo}</Text>
            {b.subtitulo && <Text style={s.bloqueSub}>{b.subtitulo}</Text>}
            {b.preguntas.filter((p) => debeMostrar(p.mostrarSi, respuestas)).map((p) => {
              if (p.tipo === "tabla") {
                const filas = (respuestas[p.id] as TablaFila[] | undefined) ?? [];
                const filasConDatos = filas.filter((f) => Object.values(f).some((v) => v && String(v).trim() !== ""));
                return (
                  <View key={p.id} wrap={false} style={{ marginTop: 10 }}>
                    <Text style={s.preguntaLabel}>{p.label}</Text>
                    {filasConDatos.length === 0 ? (
                      <Text style={s.vacia}>(Sin servicios)</Text>
                    ) : (
                      <View style={{ marginTop: 4 }}>
                        <View style={[s.tRow, s.tHeader]}>
                          {p.columnas?.map((c) => (
                            <Text key={c.key} style={[s.tCellHeader, { flex: 1 }]}>{c.label}</Text>
                          ))}
                        </View>
                        {filasConDatos.map((f, i) => (
                          <View key={i} style={s.tRow}>
                            {p.columnas?.map((c) => (
                              <Text key={c.key} style={[s.tCell, { flex: 1 }]}>{f[c.key] || "—"}</Text>
                            ))}
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              }
              let txt: string;
              if (p.tipo === "cards" && p.cards) {
                const v = respuestas[p.id] as string | undefined;
                const card = p.cards.find((c) => c.value === v);
                txt = card
                  ? `${card.titulo} — ${card.setup} · ${card.mrr}`
                  : "";
              } else {
                txt = formatRespuesta(respuestas[p.id]);
              }
              return (
                <View key={p.id} wrap={false}>
                  <Text style={s.preguntaLabel}>
                    {p.numero && <Text style={s.numero}>{p.numero}  </Text>}
                    {p.label}
                  </Text>
                  {txt ? <Text style={s.respuesta}>{txt}</Text> : <Text style={s.vacia}>(Sin respuesta)</Text>}
                </View>
              );
            })}
          </View>
        ))}

        <View style={s.footer} fixed>
          <Text style={s.footerText}>Operaria Flow · agente.operaria.cl</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
