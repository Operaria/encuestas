"use client";

interface Props {
  status: { tone: "muted" | "teal" | "warm"; text: string };
  enviando: boolean;
  onEnviar: () => void;
}

export default function SaveBar({ status, enviando, onEnviar }: Props) {
  const toneClass =
    status.tone === "teal" ? "text-teal" : status.tone === "warm" ? "text-warm" : "text-muted";
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy px-6 py-3.5 flex items-center justify-between z-[999] shadow-[0_-2px_12px_rgba(0,0,0,.2)] flex-wrap gap-3">
      <span className={`font-mono text-[12px] ${toneClass}`}>{status.text}</span>
      <div className="flex gap-3">
        <button
          onClick={onEnviar}
          disabled={enviando}
          className="bg-teal text-white rounded-md px-5 py-2.5 font-sans font-semibold text-[14px] disabled:opacity-60 hover:opacity-90 transition"
        >
          {enviando ? "Enviando..." : "Enviar encuesta"}
        </button>
      </div>
    </div>
  );
}
