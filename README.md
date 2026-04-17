# Me Caso 💍

**Me Caso** es una plataforma moderna diseñada para conectar a parejas que planean su boda con los mejores proveedores de servicios (lugares, vestidos, fotografía, etc.), inspirada en plataformas como WeddingWire o Bodas.net.

## 🚀 Stack Tecnológico

Este proyecto utiliza las versiones más recientes y vanguardistas del ecosistema web:

- **Framework:** [Next.js 16 (Canary/Experimental)](https://next.app) con App Router.
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha) (Motor de alto rendimiento).
- **Base de Datos:** [Neon](https://neon.tech) (Serverless PostgreSQL).
- **ORM:** [Drizzle ORM](https://orm.drizzle.team) para un manejo de datos seguro y eficiente.
- **Autenticación:** [Auth.js v5 (Beta)](https://authjs.dev) con soporte para Server Actions.
- **UI Components:** [Shadcn UI](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com).
- **Iconografía:** [Lucide React](https://lucide.dev).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org).

## ✨ Características Principales

- 🔐 **Autenticación Simplificada:** Sistema de login/registro "instantáneo" mediante correo electrónico (Mockup implementation).
- 👥 **Roles de Usuario:** Soporte nativo para diferentes perfiles: `cliente`, `proveedor` y `admin`.
- 🏢 **Directorio de Proveedores:** Estructura de base de datos lista para gestionar múltiples proveedores y sus servicios/productos.
- 🎨 **Interfaz Moderna:** Diseño limpio, responsive y con animaciones fluidas utilizando Tailwind 4 y Lucide.
- ⚡ **Performance:** Renderizado en servidor (SSR) y componentes de cliente optimizados.

## 🛠️ Configuración Local

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd mecaso
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de Entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:
   ```env
   DATABASE_URL="tu_url_de_neon_postgresql"
   AUTH_SECRET="un_secreto_aleatorio_para_nextauth" # Puedes usar 'npx auth secret'
   ```

4. **Sincronizar la Base de Datos:**
   Utiliza Drizzle Kit para empujar el esquema a tu base de datos Neon:
   ```bash
   npx drizzle-kit push
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```text
src/
├── app/             # Rutas, Layouts y Server Actions
├── components/      # Componentes compartidos de la aplicación
├── db/              # Configuración de Drizzle y Definición de Esquemas
├── lib/             # Utilidades y funciones comunes
├── auth.ts          # Configuración central de Auth.js
components/ui/       # Componentes base de Shadcn UI
```

## 🗺️ Roadmap / Próximos Pasos

- [ ] Implementar buscador central en la Hero Section.
- [ ] Panel de control para Proveedores (Gestión de servicios).
- [ ] Sistema de reseñas y valoraciones.
- [ ] Integración real con Google Auth.
- [ ] Galería de imágenes para productos y servicios.

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.
