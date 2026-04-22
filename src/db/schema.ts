import { desc } from "drizzle-orm";
import { pgTable, text, integer, timestamp, primaryKey, pgEnum, serial} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

//roles
export const roleEnum = pgEnum('role', ['cliente', 'proveedor', 'admin']);

//tabla usuarios
export const users = pgTable('users', {
  //crypto.randomUUID() para generar IDs seguros como "123e4567-e89b-12d3..."
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role").notNull().default("cliente"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// TABLA DE CUENTAS (Requerida por Auth.js para logins con Google/Facebook)
export const accounts = pgTable("accounts", {
  // Vincula esta cuenta con el usuario de arriba
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(), // Ej: "google" o "github"
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
},
(account) => ({
  // Define una llave primaria compuesta para evitar duplicados
  compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
}));

//TABLA DE SESIONES (Requerida por Auth.js para mantener al usuario logueado)
export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

//tablas de negocio : proveedores, serviciosProductos
export const proveedores = pgTable("proveedores", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => users.id).unique(),
  nombreComercial: text("nombre_comercial").notNull(),
  slug: text("slug").unique(),
  descripcion: text("descripcion"),
  ciudad: text("ciudad"),
  telefono: text("telefono"),
  webPage: text("web_page"),
  instagram: text("instagram"),
  facebook: text("facebook"),
  categoria: text("categoria"),
  rating: text("rating"), 
  reviews: integer("reviews").default(0),
  precioBase: text("precio_base"),
  capacidad: integer("capacidad"),
  imagenUrl: text("imagen_url"),
});

export const serviciosProductos = pgTable("servicios_productos", {
  id: serial("id").primaryKey(),
  proveedorId: integer("proveedorId").references(() => proveedores.id), 
  nombre: text("nombre").notNull(),
  descripcion: text("descripcion"),
  precio: text("precio"),
  imagenUrl: text("imagen_url"),
});

