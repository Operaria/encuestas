import Cuestionario from "@/components/Cuestionario";
import { slugToName } from "@/lib/utils";
import { getVertical } from "@/lib/verticals";

export default async function BarberPage({
  params,
  searchParams,
}: {
  params: Promise<{ cliente: string }>;
  searchParams: Promise<{ negocio?: string }>;
}) {
  const { cliente } = await params;
  const sp = await searchParams;
  const negocio = sp.negocio ? slugToName(sp.negocio) : "—";
  return <Cuestionario cliente={cliente} negocio={negocio} vertical={getVertical("barber")} />;
}
