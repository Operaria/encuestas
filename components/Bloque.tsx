"use client";

import type { Bloque as B, Respuestas, RespuestaValor } from "@/lib/types";
import { debeMostrar } from "@/lib/condicional";
import Pregunta from "./Pregunta";

interface Props {
  bloque: B;
  respuestas: Respuestas;
  onChange: (id: string, v: RespuestaValor) => void;
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function Bloque({ bloque, respuestas, onChange, innerRef }: Props) {
  return (
    <section ref={innerRef} className="mt-14">
      <h1 className="font-sans font-bold text-[26px] text-navy mt-14 mb-5 border-b-2 border-teal pb-2">
        {bloque.titulo}
      </h1>
      <h2 className="font-sans font-semibold text-[18px] text-petrol mt-7 mb-2.5">
        {bloque.subtitulo}
      </h2>
      {bloque.intro && (
        <div className="bg-white border-l-[3px] border-teal p-6 my-10 text-[15px]">
          <strong className="text-navy">{bloque.intro}</strong>
        </div>
      )}
      {bloque.preguntas.map((p) =>
        debeMostrar(p.mostrarSi, respuestas) ? (
          <Pregunta
            key={p.id}
            pregunta={p}
            valor={respuestas[p.id]}
            respuestas={respuestas}
            onChange={(v) => onChange(p.id, v)}
          />
        ) : null
      )}
    </section>
  );
}
