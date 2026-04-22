// src/db/seed.ts
import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./index";
import { proveedores, serviciosProductos } from "./schema";

async function main() {
  console.log("🌱 Limpiando base de datos...");
  await db.delete(serviciosProductos); // Borramos servicios viejos
  await db.delete(proveedores);        // Borramos proveedores viejos

  console.log("🌱 Insertando proveedores...");
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
      descripcion: "Hacienda Los Aromos es un lugar mágico rodeado de naturaleza, ideal para celebrar el matrimonio de tus sueños. Contamos con amplios salones, jardines hermosos y un equipo de profesionales dedicados a cada detalle.",
      telefono: "+56 9 1234 5678",
      webPage: "https://ejemplo.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
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

  // Insertamos y guardamos los datos creados en una variable
  const insertedProviders = await db.insert(proveedores).values(dummyProveedores).returning();

  console.log("🌱 Insertando servicios para la Hacienda...");
  // Buscamos el ID exacto que Neon le dio a la Hacienda
  const hacienda = insertedProviders.find(p => p.slug === "hacienda-los-aromos");

  if (hacienda) {
    await db.insert(serviciosProductos).values([
      {
        proveedorId: hacienda.id,
        nombre: "Menú Premium 3 Tiempos",
        descripcion: "Incluye cóctel de bienvenida, plato de fondo a elección, postre y trasnoche. Degustación previa incluida.",
        precio: "$65.000 p/p",
        imagenUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop"
      },
      {
        proveedorId: hacienda.id,
        nombre: "Bar Abierto Ilimitado",
        descripcion: "Coctelería de autor, destilados premium y cervezas artesanales por 5 horas de fiesta continua.",
        precio: "$25.000 p/p",
        imagenUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop"
      },
      {
        proveedorId: hacienda.id,
        nombre: "Decoración Floral Deluxe",
        descripcion: "Arreglos florales de temporada para centros de mesa, altar y entrada principal del salón.",
        precio: "$800.000 total",
        imagenUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop"
      }
    ]);
  }

  console.log("✅ ¡Sembrado completado con éxito!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error al sembrar:", err);
  process.exit(1);
});