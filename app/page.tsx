export default function Home() {
  return (
    <main className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-mono text-teal text-[13px] uppercase tracking-[4px] mb-6">
        Manos a la ópera
      </p>
      <h1 className="font-sans font-extrabold text-offwhite text-[48px] sm:text-[72px] leading-none tracking-[-1px]">
        Operaria <span className="text-teal">Flow.</span>
      </h1>
      <p className="text-teal text-[15px] mt-10 max-w-md">
        Plataforma de diagnósticos personalizados. Cada cliente recibe un link único.
      </p>
    </main>
  );
}
