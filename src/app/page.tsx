// src/app/page.tsx
import { auth } from "@/src/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex-1">
      {/* Aquí es donde construiremos el "Hero Section" inspirado en WeddingWire.
        Por ahora, solo dejamos un espacio de prueba.
      */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
          Encuentra tu equipo de boda
        </h1>
        <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
          Busca entre miles de profesionales locales con reseñas, precios y más.
        </p>
        
        {/* Próximo paso: El buscador central */}
      </section>
    </main>
  );
}