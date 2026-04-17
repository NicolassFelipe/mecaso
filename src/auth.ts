// src/auth.ts
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/src/db/index";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm"; // <-- Utilidad de Drizzle para buscar coincidencias
import Credentials from "next-auth/providers/credentials";

// Exporta las funciones
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Mockup Login",
      credentials: {
        email: { label: "Email de prueba", type: "email" },
    },
    async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = credentials.email as string;
        // Buscamos si el usuario ya existe en Neon
        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser.length > 0) {
          return existingUser[0]; // Si existe, lo dejamos pasar
        }

        //  Si no existe, lo creamos acá para no tener que registrarnos
        const newUser = await db.insert(users).values({
          email: email,
          name: "Usuario Demo",
          // Usamos una API gratuita (DiceBear) que genera avatares graciosos basados en el email, lol.
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`, 
          role: "cliente"
        }).returning();

        return newUser[0];
      }
    })
  ],
  
  // Reglas de seguridad que se ejecutan durante el login
  callbacks: {
    // 1. Del Usuario (DB) al Token (JWT)
    async jwt({ token, user }) {
      // Esta condición 'if(user)' solo se ejecuta la primera vez que inicias sesión
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image; // En los JWT estándar, la imagen se llama 'picture'
      }
      return token;
    },
    // 2. Del Token a la Sesión (Lo que lee tu pantalla en page.tsx)
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    }
  },
});