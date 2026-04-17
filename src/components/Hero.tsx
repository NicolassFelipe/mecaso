// src/components/Hero.tsx
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center py-16 lg:py-32">
          
          <div className="w-full lg:w-1/2 z-10 lg:pr-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
              Construye tu boda ideal
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 mb-10 max-w-2xl">
              Encuentra lo que buscas con reseñas reales, precios y disponibilidad.
            </p>
            
            <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-xl border border-zinc-200 p-2 gap-2 max-w-3xl">
              <div className="flex-1 flex items-center px-4 bg-white rounded border border-transparent focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                <Search className="text-zinc-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="¿Qué buscas? (Ej. Fotógrafo)" 
                  className="w-full bg-transparent border-none py-3 text-zinc-700 outline-none placeholder:text-zinc-400"
                />
              </div>

              <div className="flex-1 flex items-center px-4 bg-white border-t sm:border-t-0 sm:border-l border-zinc-200 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                <MapPin className="text-zinc-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="¿Dónde? (Ej. Santiago)" 
                  className="w-full bg-transparent border-none py-3 text-zinc-700 outline-none placeholder:text-zinc-400"
                />
              </div>

              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-6 px-10 rounded-md text-lg w-full sm:w-auto">
                Buscar
              </Button>
            </div>
          </div>

          <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 to-transparent z-10 w-24"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" 
              alt="Pareja feliz celebrando su boda" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}