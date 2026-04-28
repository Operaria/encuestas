import Link from "next/link";
import { getCliente, type ClienteDoc, type ConexionEstado } from "@/lib/firestore";

export const dynamic = "force-dynamic";

const BACKEND_URL =
  process.env.BACKEND_URL || "https://operaria-barberia-demo-XXXX.run.app";
const META_CLIENT_ID = process.env.NEXT_PUBLIC_META_CLIENT_ID || "";
const MP_CLIENT_ID = process.env.NEXT_PUBLIC_MP_CLIENT_ID || "";

const META_SCOPES = [
  "whatsapp_business_management",
  "whatsapp_business_messaging",
  "business_management",
  "instagram_basic",
  "pages_show_list",
].join(",");

const MP_SCOPES = "offline_access read write";

function metaAuthUrl(slug: string): string {
  const redirect = `${BACKEND_URL}/oauth/meta/callback`;
  const params = new URLSearchParams({
    client_id: META_CLIENT_ID,
    redirect_uri: redirect,
    state: slug,
    scope: META_SCOPES,
    response_type: "code",
  });
  return `https://www.facebook.com/v21.0/dialog/oauth?${params.toString()}`;
}

function mpAuthUrl(slug: string): string {
  const redirect = `${BACKEND_URL}/oauth/mercadopago/callback`;
  const params = new URLSearchParams({
    client_id: MP_CLIENT_ID,
    redirect_uri: redirect,
    state: slug,
    response_type: "code",
    platform_id: "mp",
    scope: MP_SCOPES,
  });
  return `https://auth.mercadopago.cl/authorization?${params.toString()}`;
}

function StatusPill({ estado }: { estado: ConexionEstado }) {
  const map: Record<ConexionEstado, { label: string; cls: string }> = {
    conectado: { label: "✓ Conectado", cls: "bg-[#1B4D4A] text-white" },
    pendiente: { label: "Pendiente", cls: "bg-[#E8A838] text-[#0F1E3A]" },
    operaria_lo_crea: { label: "Operaria lo crea", cls: "bg-[#4A9B93] text-white" },
    no_aplica: { label: "No aplica", cls: "bg-[#D6D2CB] text-[#3D4450]" },
  };
  const { label, cls } = map[estado];
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${cls}`}>
      {label}
    </span>
  );
}

function CuentaCard({
  titulo,
  descripcion,
  estado,
  cta,
  href,
  nota,
}: {
  titulo: string;
  descripcion: string;
  estado: ConexionEstado;
  cta?: string;
  href?: string;
  nota?: string;
}) {
  return (
    <div className="border border-[#D6D2CB] bg-white rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-xl font-bold text-[#0F1E3A]">{titulo}</h3>
        <StatusPill estado={estado} />
      </div>
      <p className="text-[#3D4450] mb-4">{descripcion}</p>
      {cta && href && estado === "pendiente" && (
        <a
          href={href}
          className="inline-block bg-[#0F1E3A] text-white px-5 py-2.5 rounded-md font-semibold hover:bg-[#1B4D4A] transition"
        >
          {cta}
        </a>
      )}
      {nota && <p className="mt-3 text-sm text-[#9E9C96] italic">{nota}</p>}
    </div>
  );
}

function googleEstado(c: ClienteDoc): ConexionEstado {
  if (c.google_estado) return c.google_estado;
  return c.requiere_creacion_google ? "operaria_lo_crea" : "conectado";
}

function metaEstado(c: ClienteDoc): ConexionEstado {
  if (c.meta_estado) return c.meta_estado;
  return c.tiene_whatsapp_business ? "pendiente" : "operaria_lo_crea";
}

function mpEstado(c: ClienteDoc): ConexionEstado {
  if (c.mp_estado) return c.mp_estado;
  const aplica =
    c.entrada_contratada?.toLowerCase().includes("barber360") ||
    c.entrada_contratada?.toLowerCase().includes("agenda+operacion") ||
    c.tiene_mercadopago;
  if (!aplica) return "no_aplica";
  return c.tiene_mercadopago ? "pendiente" : "operaria_lo_crea";
}

export default async function ConectarPage({
  params,
}: {
  params: Promise<{ cliente: string }>;
}) {
  const { cliente } = await params;
  const doc = await getCliente(cliente);

  if (!doc) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-[#0F1E3A] mb-4">
          Cliente no encontrado
        </h1>
        <p className="text-[#3D4450]">
          No tenemos registro de <code className="font-mono">{cliente}</code>. Contáctanos por
          WhatsApp en{" "}
          <a
            href="https://wa.me/56987664512"
            className="text-[#1B4D4A] underline font-semibold"
          >
            +56 9 8766 4512
          </a>{" "}
          y lo resolvemos al toque.
        </p>
      </main>
    );
  }

  const isPiloto = doc.modalidad === "sin_cobro";

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {isPiloto && (
        <div className="bg-[#E8A838] text-[#0F1E3A] px-5 py-3 rounded-md mb-6 font-semibold">
          Modalidad piloto sin cobro · MRR $0
        </div>
      )}

      <header className="mb-10 border-b border-[#D6D2CB] pb-6">
        <p className="font-mono text-sm text-[#9E9C96] uppercase tracking-wider mb-2">
          Anexo de Conexión y Credenciales · v1
        </p>
        <h1 className="text-4xl font-bold text-[#0F1E3A] mb-2">
          {doc.nombre_negocio}
        </h1>
        <p className="text-[#3D4450]">
          Entrada contratada:{" "}
          <span className="font-semibold">{doc.entrada_contratada}</span>
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[#0F1E3A] mb-2">
          Conecta tus cuentas
        </h2>
        <p className="text-[#3D4450] mb-6">
          Operaria necesita acceso a tu agenda, WhatsApp y pasarela de cobro para
          operar tu negocio. El acceso es revocable en cualquier momento desde tu
          cuenta de origen.
        </p>

        <CuentaCard
          titulo="Google (Calendar · Drive · Sheets · Gmail)"
          descripcion="Operaria gestiona tu agenda, planilla operativa y correos vía nuestra cuenta de servicio autorizada (Domain-Wide Delegation). No necesitas hacer nada."
          estado={googleEstado(doc)}
          nota={
            doc.requiere_creacion_google
              ? "Operaria te crea la cuenta Google del negocio como parte del setup."
              : undefined
          }
        />

        <CuentaCard
          titulo="Meta Business (WhatsApp Cloud · Instagram)"
          descripcion="Conecta tu Meta Business para que Operaria envíe y reciba mensajes en tu nombre vía WhatsApp Cloud API."
          estado={metaEstado(doc)}
          cta="Conectar con Meta"
          href={metaAuthUrl(cliente)}
          nota={
            !doc.tiene_whatsapp_business
              ? "Operaria gestiona la creación y verificación de tu cuenta WhatsApp Business como parte del onboarding."
              : undefined
          }
        />

        <CuentaCard
          titulo="MercadoPago"
          descripcion="Conecta tu cuenta MercadoPago para que Operaria cobre depósitos, anticipos o servicios en tu nombre."
          estado={mpEstado(doc)}
          cta="Conectar con MercadoPago"
          href={mpAuthUrl(cliente)}
          nota={
            mpEstado(doc) === "operaria_lo_crea"
              ? "Operaria te ayuda a crear y verificar la cuenta como parte del setup."
              : mpEstado(doc) === "no_aplica"
              ? "Tu entrada contratada no incluye cobros. Si quieres habilitarlos, escríbenos."
              : undefined
          }
        />
      </section>

      <footer className="mt-12 pt-6 border-t border-[#D6D2CB] text-sm text-[#9E9C96]">
        <p>
          ¿Dudas? <Link href="https://wa.me/56987664512" className="underline">+56 9 8766 4512</Link>{" "}
          · franciscomunoz@operaria.cl
        </p>
      </footer>
    </main>
  );
}
