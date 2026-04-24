import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFDiagnostico } from "@/components/PDFDiagnostico";
import { formatDate } from "@/lib/utils";
import { getVertical } from "@/lib/verticals";
import type { SubmitPayload, RespuestaValor } from "@/lib/types";
import React from "react";

export const runtime = "nodejs";

function fmt(v: RespuestaValor | undefined): string {
  if (v === undefined || v === null || v === "") return "—";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return "—";
    if (typeof v[0] === "string") return (v as string[]).join(", ");
    return `${v.length} elementos`;
  }
  if (typeof v === "object" && "seleccion" in v) {
    const parts = [...v.seleccion];
    if (v.otro) parts.push(`Otros: ${v.otro}`);
    return parts.join(", ");
  }
  return "—";
}

function htmlBody(p: SubmitPayload, nombreEncuesta: string): string {
  const r = p.respuestas;
  const resumen = p.vertical === "barber"
    ? `
      <p><strong style="color:#0F1E3A;">Contacto:</strong><br>${fmt(r.id_nombre)} — ${fmt(r.id_telefono)}</p>
      <p><strong style="color:#0F1E3A;">Dolor principal:</strong><br>${fmt(r.contexto_principal_dolor)}</p>
      <p><strong style="color:#0F1E3A;">Volumen diario:</strong> ${fmt(r.contexto_volumen_diario)}</p>
      <p><strong style="color:#0F1E3A;">Delegaría primero:</strong><br>${fmt(r.contexto_delegar)}</p>`
    : `
      <p><strong style="color:#0F1E3A;">Nombre / cargo:</strong><br>${fmt(r.p1)}</p>
      <p><strong style="color:#0F1E3A;">Rubro:</strong><br>${fmt(r.p2)}</p>
      <p><strong style="color:#0F1E3A;">Dolor principal:</strong><br>${fmt(r.p6)}</p>
      <p><strong style="color:#0F1E3A;">Nivel de impacto (1-10):</strong> ${fmt(r.p20)}</p>
      <p><strong style="color:#0F1E3A;">Mejor forma de contacto:</strong><br>${fmt(r.p21)}</p>`;

  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #F2F0EB; color: #3D4450;">
    <div style="background: #0F1E3A; color: #fff; padding: 24px; border-radius: 8px 8px 0 0;">
      <div style="color: #4A9B93; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">${nombreEncuesta}</div>
      <h1 style="margin: 8px 0 0; font-size: 22px;">Diagnóstico completado</h1>
      <p style="margin: 6px 0 0; color: #4A9B93; font-size: 14px;">${p.nombreFormateado}</p>
    </div>
    <div style="background: #fff; padding: 24px; border-radius: 0 0 8px 8px;">
      ${resumen}
      <hr style="border: none; border-top: 1px solid #D6D2CB; margin: 16px 0;">
      <p style="color: #9E9C96; font-size: 12px;">PDF completo adjunto.</p>
    </div>
  </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as SubmitPayload;
    if (!payload.cliente || !payload.respuestas) {
      return NextResponse.json({ success: false, error: "Payload inválido" }, { status: 400 });
    }

    const vertical = getVertical(payload.vertical ?? "generico");
    const fecha = formatDate(new Date(payload.timestamp || Date.now()));

    const element = React.createElement(PDFDiagnostico, {
      nombre: payload.nombreFormateado,
      fecha,
      bloques: vertical.bloques,
      respuestas: payload.respuestas,
      titulo: vertical.nombreEncuesta,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(element as any);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.DESTINATION_EMAIL;
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
    if (!apiKey || !to) {
      return NextResponse.json({ success: false, error: "Faltan variables de entorno" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Onboarding ${vertical.id} — ${payload.nombreFormateado}`,
      html: htmlBody(payload, vertical.nombreEncuesta),
      attachments: [
        {
          filename: `Levantamiento-${payload.negocio || payload.cliente}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message ?? "Error Resend" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error desconocido";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
