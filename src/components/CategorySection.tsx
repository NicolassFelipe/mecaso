// src/components/CategorySection.tsx
import Link from "next/link";

const CATEGORIES = [
  {
    title: "Novias",
    description: "Encuentra el vestido perfecto, accesorios y expertos en belleza para brillar en tu día.",
    image: "https://images.unsplash.com/photo-1574871786514-46e1680ea587?q=80&w=987&auto=format&fit=crop",
  },
  {
    title: "Lugares",
    description: "Explora salones, haciendas, hoteles y más lugares para celebrar tu amor.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Banquetería", 
    description: "Descubre banqueteras, pastelerías y servicios de catering que deleitarán a tus invitados.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Multimedia",
    description: "Fotógrafos y videógrafos que capturarán cada instante mágico.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  }
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold text-zinc-900 mb-2">Encuentra cada proveedor que necesitas</h2>
      <p className="text-zinc-600 mb-10">Conecta con expertos de bodas que darán vida a tu gran día.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {CATEGORIES.map((category) => (
          <Link key={category.title} href="#" className="group block h-full">
            <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              
              <div className="relative h-48 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              <div className="p-5 text-center flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-zinc-900 mb-2">{category.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed flex-1">
                  {category.description}
                </p>
              </div>

            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}