import { db } from "@/src/db";
import { proveedores } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { MapPin, Star, Users, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProveedorProfile({ params }: PageProps) {
  const resolvedParams = await params;
  const proveedorSlug = resolvedParams.slug;

  const result = await db.select().from(proveedores).where(eq(proveedores.slug, proveedorSlug)).limit(1);
  const vendor = result[0];

  if (!vendor) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-zinc-700">Proveedor no encontrado</h1>
      </div>
    );
  }

  const highResImage = vendor.imagenUrl?.replace("w=800", "w=1920") || "";

  return (
    <main className="flex-1 bg-white">
      
      {/* Portada (Hero) - Solo con Categoría y Título */}
      <div className="relative w-full min-h-[350px] md:min-h-[450px] flex items-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={highResImage} 
          alt={vendor.nombreComercial} 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
        
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-32">
          <span className="inline-block bg-teal-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 text-white shadow-sm">
            {vendor.categoria}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-white drop-shadow-lg tracking-tight">
            {vendor.nombreComercial}
          </h1>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 1. Lugar y Estrellas debajo de la imagen */}
        <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-zinc-600 font-medium border-b border-zinc-200 pb-6 mb-8">
          <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-teal-600" /> {vendor.ciudad}</span>
          <span className="flex items-center gap-2"><Star className="w-5 h-5 fill-amber-400 text-amber-400" /> {vendor.rating} ({vendor.reviews} reseñas)</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Columna Izquierda: Información */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Acerca de</h2>
            <p className="text-zinc-600 leading-relaxed mb-8 whitespace-pre-wrap">
              {vendor.descripcion || "Este proveedor aún no ha agregado una descripción a su perfil."}
            </p>

            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Detalles Rápidos</h2>
            <ul className="space-y-3 mb-8 border-t border-b border-zinc-200 py-6">
              {vendor.precioBase && (
                 <li className="flex justify-between"><span className="text-zinc-500">Precio Inicial</span><span className="font-medium">{vendor.precioBase}</span></li>
              )}
              {vendor.capacidad && (
                 <li className="flex justify-between"><span className="text-zinc-500">Capacidad Máxima</span><span className="font-medium flex items-center gap-1"><Users className="w-4 h-4"/> {vendor.capacidad} invitados</span></li>
              )}
            </ul>
          </div>

          {/* Columna Derecha: Tarjeta de Contacto (2 y 3. Sin recuadro y alineado a la derecha) */}
          <div className="w-full md:w-auto md:min-w-[300px] shrink-0">
            <div className="sticky top-24 flex flex-col items-end">
              
              <h3 className="text-lg font-medium text-zinc-500 mb-3">¿Te interesa?</h3>
              
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-6 px-10 mb-6 text-lg w-auto shadow-md transition-transform hover:scale-105">
                Pedir Presupuesto
              </Button>
              
              {/* Información extra también alineada a la derecha por coherencia */}
              <div className="space-y-4 pt-6 border-t border-zinc-100 w-full flex flex-col items-end">
                {vendor.telefono && (
                  <div className="flex items-center gap-3 text-zinc-600">
                    <span className="text-sm font-medium">{vendor.telefono}</span>
                    <div className="bg-zinc-100 p-2 rounded-full"><Phone className="w-4 h-4 text-teal-600" /></div>
                  </div>
                )}
                {vendor.webPage && (
                  <div className="flex items-center gap-3 text-zinc-600">
                    <a href={vendor.webPage} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-teal-600 hover:underline">Visitar sitio web</a>
                    <div className="bg-zinc-100 p-2 rounded-full"><Globe className="w-4 h-4 text-teal-600" /></div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}