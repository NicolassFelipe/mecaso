// src/db/seed.ts
import { config } from "dotenv";
config({ path: ".env.local" }); // Carga tu DATABASE_URL

import { db } from "./index";
import { proveedores } from "./schema";

async function main() {
  console.log("🌱 Iniciando el sembrado (seeding) de la base de datos...");

  const dummyProveedores = [
    {
      nombreComercial: "Hacienda Los Aromos",
      slug: "hacienda-los-aromos",
      categoria: "Lugares",
      ciudad: "Santiago, RM",
      rating: "5.0",
      reviews: 119,
      precioBase: "Desde $1.500.000",
      capacidad: 200,
      imagenUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
    },
    {
      nombreComercial: "Estudio Fotográfico Luz",
      slug: "estudio-fotografico-luz",
      categoria: "Fotografía",
      ciudad: "Viña del Mar, Valparaíso",
      rating: "4.9",
      reviews: 85,
      precioBase: "Desde $450.000",
      imagenUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    },
    {
      nombreComercial: "Banquetería Imperial",
      slug: "banqueteria-imperial",
      categoria: "Banquetería",
      ciudad: "Providencia, RM",
      rating: "5.0",
      reviews: 295,
      precioBase: "Desde $45.000 p/p",
      capacidad: 300,
      imagenUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
    },
    {
      nombreComercial: "Boutique Novias Elegance",
      slug: "boutique-novias-elegance",
      categoria: "Vestidos",
      ciudad: "Las Condes, RM",
      rating: "4.8",
      reviews: 201,
      precioBase: "Desde $800.000",
      imagenUrl: "https://images.unsplash.com/photo-1546190255-451a91afc548?q=80&w=800&auto=format&fit=crop",
    }
  ];

  // Insertamos uno por uno en la base de datos
  for (const prov of dummyProveedores) {
    await db.insert(proveedores).values(prov);
  }

  console.log("✅ ¡Sembrado completado con éxito!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error al sembrar:", err);
  process.exit(1);
});