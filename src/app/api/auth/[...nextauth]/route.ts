// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/src/auth";

// Auth.js ya tiene programada toda la lógica de HTTP (GET, POST)
// Nosotros simplemente re-exportamos esas funciones para que Next.js las use.
export const { GET, POST } = handlers;