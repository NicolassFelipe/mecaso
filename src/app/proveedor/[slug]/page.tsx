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

  // Usamos w=1920 para que no se pixele al ser tan alta
  const highResImage = vendor.imagenUrl?.replace("w=800", "w=1920") || "";

  return (
    <main className="flex-1 bg-white">
      
      {/* Portada (Hero) - ALTURA TRIPLICADA */}
      <div className="relative w-full min-h-[600px] md:h-[80vh] flex items-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={highResImage} 
          alt={vendor.nombreComercial} 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-32">
          <span className="inline-block bg-teal-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 text-white shadow-sm">
            {vendor.categoria}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-2 text-white drop-shadow-2xl tracking-tight">
            {vendor.nombreComercial}
          </h1>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Lugar y Estrellas debajo de la imagen */}
        <div className="flex flex-wrap items-center gap-8 text-base md:text-lg text-zinc-600 font-medium border-b border-zinc-200 pb-8 mb-10">
          <span className="flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-teal-600" /> 
            {vendor.ciudad}
          </span>
          <span className="flex items-center gap-2.5">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" /> 
            {vendor.rating} ({vendor.reviews} reseñas)
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Columna Izquierda: Información */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-zinc-900 mb-6">Acerca de</h2>
            <p className="text-zinc-600 text-lg leading-relaxed mb-10 whitespace-pre-wrap">
              {vendor.descripcion || "Este proveedor aún no ha agregado una descripción a su perfil."}
            </p>

            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Detalles Rápidos</h2>
            <ul className="space-y-4 mb-10 border-t border-b border-zinc-200 py-8 text-lg">
              {vendor.precioBase && (
                 <li className="flex justify-between">
                    <span className="text-zinc-500">Precio Inicial</span>
                    <span className="font-semibold text-zinc-900">{vendor.precioBase}</span>
                 </li>
              )}
              {vendor.capacidad && (
                 <li className="flex justify-between">
                    <span className="text-zinc-500">Capacidad Máxima</span>
                    <span className="font-semibold text-zinc-900 flex items-center gap-2">
                      <Users className="w-5 h-5"/> {vendor.capacidad} invitados
                    </span>
                 </li>
              )}
            </ul>
          </div>

          {/* Columna Derecha: Tarjeta de Contacto */}
          <div className="w-full md:w-auto md:min-w-[350px] shrink-0">
            <div className="sticky top-28 flex flex-col items-end">
              
              <h3 className="text-xl font-medium text-zinc-400 mb-4 italic">¿Te interesa este proveedor?</h3>
              
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-8 px-12 mb-8 text-xl w-auto shadow-lg transition-all hover:scale-105 active:scale-95">
                Pedir Presupuesto
              </Button>
              
              <div className="space-y-6 pt-8 border-t border-zinc-100 w-full flex flex-col items-end">
                {vendor.telefono && (
                  <div className="flex items-center gap-4 text-zinc-600">
                    <span className="text-lg font-medium">{vendor.telefono}</span>
                    <div className="bg-zinc-100 p-3 rounded-full shadow-sm">
                      <Phone className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                )}
                {vendor.webPage && (
                  <div className="flex items-center gap-4 text-zinc-600">
                    <a href={vendor.webPage} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-teal-600 hover:underline">
                      Visitar sitio web
                    </a>
                    <div className="bg-zinc-100 p-3 rounded-full shadow-sm">
                      <Globe className="w-5 h-5 text-teal-600" />
                    </div>
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