"use client";

import type { Pregunta as P, RespuestaValor } from "@/lib/types";

interface Props {
  pregunta: P;
  valor: RespuestaValor | undefined;
  onChange: (v: RespuestaValor) => void;
}

const inputBase =
  "w-full font-sans text-[15px] text-body bg-white border border-border rounded px-3 py-2.5 transition-all outline-none focus:border-teal focus:ring-[3px] focus:ring-teal/15";

export default function Pregunta({ pregunta, valor, onChange }: Props) {
  return (
    <div className="mb-6">
      <label className="block font-sans font-semibold text-[15px] text-navy mb-2">
        <span className="font-mono text-teal text-[12px] font-medium mr-1.5">{pregunta.numero}</span>
        {pregunta.label}
      </label>
      {pregunta.hint && (
        <p className="text-[13px] text-muted -mt-1.5 mb-3">{pregunta.hint}</p>
      )}
      {renderInput(pregunta, valor, onChange)}
    </div>
  );
}

function renderInput(pregunta: P, valor: RespuestaValor | undefined, onChange: (v: RespuestaValor) => void) {
  if (pregunta.tipo === "texto") {
    return (
      <input
        type="text"
        className={inputBase}
        value={(valor as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (pregunta.tipo === "textarea") {
    return (
      <textarea
        className={`${inputBase} resize-y min-h-[72px]`}
        value={(valor as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (pregunta.tipo === "checkboxes") {
    const v = (valor as { seleccion: string[]; otro?: string }) ?? { seleccion: [], otro: "" };
    const seleccion = v.seleccion ?? [];
    const toggle = (op: string) => {
      const nuevo = seleccion.includes(op) ? seleccion.filter((s) => s !== op) : [...seleccion, op];
      onChange({ seleccion: nuevo, otro: v.otro ?? "" });
    };
    const tieneOtros = seleccion.includes("Otros");
    return (
      <div>
        <div className="flex flex-wrap gap-x-4 gap-y-2.5 mt-1">
          {pregunta.opciones?.map((op) => (
            <label
              key={op}
              className="inline-flex items-center gap-1.5 text-[14px] text-body cursor-pointer px-3 py-1.5 border border-border rounded bg-white"
            >
              <input
                type="checkbox"
                checked={seleccion.includes(op)}
                onChange={() => toggle(op)}
              />
              {op}
            </label>
          ))}
        </div>
        {tieneOtros && (
          <input
            type="text"
            placeholder="Especifica..."
            className={`${inputBase} mt-3`}
            value={v.otro ?? ""}
            onChange={(e) => onChange({ seleccion, otro: e.target.value })}
          />
        )}
      </div>
    );
  }
  if (pregunta.tipo === "slider") {
    const min = pregunta.min ?? 1;
    const max = pregunta.max ?? 10;
    const val = (typeof valor === "number" ? valor : Math.round((min + max) / 2));
    return (
      <div>
        <div className="text-center mb-2">
          <span className="font-mono text-teal text-[28px] font-medium">{val}</span>
          <span className="font-mono text-muted text-[14px]"> / {max}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between mt-1 font-mono text-[11px] text-muted uppercase tracking-wider">
          <span>{pregunta.labelMin}</span>
          <span>{pregunta.labelMax}</span>
        </div>
      </div>
    );
  }
  return null;
}
