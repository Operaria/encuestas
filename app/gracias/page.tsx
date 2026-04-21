import { slugToName } from "@/lib/utils";

export default async function Gracias({
  searchParams,
}: {
  searchParams: Promise<{ cliente?: string }>;
}) {
  const sp = await searchParams;
  const nombre = sp.cliente ? slugToName(sp.cliente) : "";
  return (
    <main className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="font-sans font-bold text-offwhite text-[36px] sm:text-[48px] leading-tight">
        ¡Gracias{nombre ? `, ${nombre}` : ""}!
      </h1>
      <p className="text-teal text-[16px] mt-6 max-w-xl">
        Recibimos tu diagnóstico. Te contactaremos en las próximas 48 horas con una propuesta concreta de automatización.
      </p>
      <p className="font-mono text-muted text-[12px] mt-16 uppercase tracking-[3px]">
        Operaria Flow · Manos a la ópera
      </p>
    </main>
  );
}
