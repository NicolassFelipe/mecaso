// src/components/FeaturedVendors.tsx
import Link from "next/link";
import { Star, MapPin, Users } from "lucide-react";

// Lista de proveedores de prueba
const VENDORS = [
  {
    name: "Hacienda Los Aromos",
    category: "Lugares",
    location: "Santiago, RM",
    rating: 5.0,
    reviews: 119,
    price: "Desde $1.500.000",
    capacity: 200,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Estudio Fotográfico Luz",
    category: "Fotografía",
    location: "Viña del Mar, Valparaíso",
    rating: 4.9,
    reviews: 85,
    price: "Desde $450.000",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Banquetería Imperial",
    category: "Banquetería",
    location: "Providencia, RM",
    rating: 5.0,
    reviews: 295,
    price: "Desde $45.000 p/p",
    capacity: 300,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Boutique Novias Elegance",
    category: "Vestidos",
    location: "Las Condes, RM",
    rating: 4.8,
    reviews: 201,
    price: "Desde $800.000",
    image: "https://images.unsplash.com/photo-1596450514735-111a2fe02935?q=80&w=800&auto=format&fit=crop",
  }
];

export default function FeaturedVendors() {
  return (
    <section className="bg-zinc-50 py-20 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección con botón "Ver todos" */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">Proveedores Mejor Valorados</h2>
            <p className="text-zinc-600">Descubre los profesionales con las mejores reseñas en tu zona.</p>
          </div>
          <Link href="#" className="mt-4 sm:mt-0 font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors">
            Ver todos los ganadores <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Cuadrícula de Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VENDORS.map((vendor) => (
            <Link key={vendor.name} href="#" className="group block h-full">
              <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                
                {/* Foto */}
                <div className="relative h-48 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={vendor.image} 
                    alt={vendor.name} 
                    className="w-full h-full object-cover" 
                  />
                  {/* Etiqueta de categoría sobre la foto */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-zinc-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {vendor.category}
                  </div>
                </div>

                {/* Contenido (Textos) */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-teal-600 transition-colors line-clamp-1">
                    {vendor.name}
                  </h3>
                  
                  {/* Ubicación */}
                  <div className="flex items-center text-zinc-500 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {vendor.location}
                  </div>

                  {/* Estrellas y Reseñas */}
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-zinc-800 text-sm">{vendor.rating.toFixed(1)}</span>
                    <span className="text-zinc-500 text-sm">({vendor.reviews})</span>
                  </div>

                  {/* Separador */}
                  <div className="mt-auto border-t border-zinc-100 pt-3 flex items-center justify-between text-sm text-zinc-700 font-medium">
                    <span>{vendor.price}</span>
                    {vendor.capacity && (
                      <div className="flex items-center gap-1.5 text-zinc-500 font-normal">
                        <Users className="w-4 h-4" />
                        {vendor.capacity}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}