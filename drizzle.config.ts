import { config } from 'dotenv'; // Cambia el import
import { defineConfig } from 'drizzle-kit';

// Fuerza a dotenv a leer .env.local
config({ path: '.env.local' }); 

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});