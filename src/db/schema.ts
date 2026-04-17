import { pgTable, serial, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['cliente', 'proveedor', 'admin']);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  email: text("email").notNull().unique(),
  role: roleEnum("role").default('cliente'),
  imgPerfil: text("img_perfil"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const proveedores = pgTable("proveedores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).unique(),
  nombreComercial: text("nombre_comercial").notNull(),
  descripcion: text("descripcion"),
  ciudad: text("ciudad"),
  telefono: text("telefono"),
  webpage: text("webpage"),
});

export const serviciosProductos = pgTable("servicios_productos", {
  id: serial("id").primaryKey(),
  proveedorId: integer("proveedor_id").references(() => proveedores.id),
  nombre: text("nombre").notNull(),
  descripcion: text("descripcion"),
  precioAprox: integer("precio_aprox"),
});