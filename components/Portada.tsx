"use client";

interface Props {
  nombre: string;
  negocio: string;
  fecha: string;
  onComenzar: () => void;
  titulo?: string;
  marca?: string;
  tagline?: string;
  subtitulo?: string;
  tema?: "flow" | "paraguas";
}

export default function Portada({
  nombre,
  negocio,
  fecha,
  onComenzar,
  titulo,
  marca = "Flow",
  tagline = "Manos a la ópera",
  subtitulo = "Con esta información, armamos tu operación.",
  tema = "flow",
}: Props) {
  const isParaguas = tema === "paraguas";

  return (
    <section className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-16 sm:px-10">
      <div className="max-w-3xl w-full flex flex-col items-center text-center">
        <p className="font-mono text-teal text-[13px] uppercase tracking-[4px] mb-6">
          {tagline}
        </p>

        {isParaguas ? (
          <h1
            className="font-display text-offwhite text-[56px] sm:text-[88px] leading-none"
            style={{ letterSpacing: "0.08em" }}
          >
            OPERARIA<span className="text-teal">.</span>
          </h1>
        ) : (
          <h1 className="font-sans font-extrabold text-offwhite text-[48px] sm:text-[72px] leading-none tracking-[-1px]">
            Operaria <span className="text-teal">{marca}.</span>
          </h1>
        )}

        {isParaguas && (
          <p className="font-mono text-teal text-[11px] uppercase tracking-[3px] mt-3">
            Studio · Páginas web
          </p>
        )}

        <hr className="border-0 border-t-[1.5px] border-teal w-[120px] my-10" />

        <h2
          className={
            isParaguas
              ? "font-display italic text-white text-[28px] sm:text-[40px] leading-tight"
              : "font-sans font-bold text-white text-[28px] sm:text-[38px] leading-tight"
          }
        >
          {titulo ?? "Encuesta de Levantamiento"}
        </h2>
        <p className="text-teal text-[16px] mt-4 max-w-xl">{subtitulo}</p>

        <div className="border-t border-petrol mt-12 pt-6 w-full flex flex-wrap justify-center gap-x-12 gap-y-4">
          <MetaPair label="Cliente" value={nombre} />
          <MetaPair label="Negocio" value={negocio} />
          <MetaPair label="Fecha" value={fecha} />
        </div>

        <button
          onClick={onComenzar}
          className="mt-14 bg-teal text-white font-sans font-semibold text-[14px] px-8 py-3 rounded-full hover:opacity-90 transition tracking-wide"
        >
          Comenzar
        </button>
      </div>
    </section>
  );
}

function MetaPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-mono text-muted text-[11px] uppercase tracking-[2px]">{label}</span>
      <span className="font-mono text-white text-[12px]">{value}</span>
    </div>
  );
}
