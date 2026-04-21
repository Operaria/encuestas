import Cuestionario from "@/components/Cuestionario";

export default async function DiagnosticoPage({
  params,
}: {
  params: Promise<{ cliente: string }>;
}) {
  const { cliente } = await params;
  return <Cuestionario cliente={cliente} />;
}
