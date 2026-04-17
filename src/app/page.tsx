// src/app/page.tsx
import { auth, signIn, signOut } from "@/src/auth"; // <-- Corregido el import

export default async function Home() {
  const session = await auth();

  return (
    <main className="p-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">MeCaso - Inicio (Modo Mockup)</h1>

      {!session ? (
        <div className="border p-6 rounded max-w-sm">
          <p className="mb-4">Ingresa con un usuario de prueba:</p>
          
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
            className="flex flex-col gap-3"
          >
            <input 
              type="email" 
              name="email" 
              placeholder="correo@inventado.com" 
              required 
              className="border p-2 rounded text-black"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Entrar al sistema
            </button>
          </form>
        </div>
      ) : (
        <div className="border p-6 rounded max-w-sm">
          
          {/* 1. Lógica de la imagen segura */}
          {session.user?.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={session.user.image} 
              alt="Foto de perfil" 
              className="w-16 h-16 rounded-full mb-4 bg-gray-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full mb-4 bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
              {session.user?.name?.charAt(0) || "U"}
            </div>
          )}

          {/* 2. Textos de información del usuario (Los habíamos borrado) */}
          <p className="mb-2 text-black"><strong>Bienvenido, {session.user?.name}</strong></p>
          <p className="mb-2 text-sm text-gray-600">Email: {session.user?.email}</p>
          <p className="mb-4 text-sm text-gray-600">Rol DB: {session.user?.role}</p>
          
          {/* 3. Botón de Cerrar Sesión */}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full">
              Cerrar sesión
            </button>
          </form>
        </div>
      )}
    </main>
  );
}