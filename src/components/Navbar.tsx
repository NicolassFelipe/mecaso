// src/components/Navbar.tsx
import Link from "next/link";
import { auth, signIn, signOut } from "@/src/auth";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react"; // shadcn ya nos instaló los íconos de Lucide por defecto
import { AuthModal } from "./AuthModal";

export default async function Navbar() {
  // 1. Verificamos si hay un usuario logueado directamente en el servidor
  const session = await auth();
  const handleSignIn = async (formData: FormData) => {
    "use server";
    await signIn("credentials", formData);
  };


  return (
    // 'sticky top-0 z-50' hace que la barra se quede pegada arriba al hacer scroll
    <nav className="w-full bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* SECCIÓN IZQUIERDA: Logo y Nombre */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Heart className="h-8 w-8 text-teal-600" fill="currentColor" />
            <Link href="/" className="text-3xl font-bold text-zinc-900 tracking-tight">
              MeCaso.cl
            </Link>
          </div>

          {/* SECCIÓN CENTRAL: Enlaces (Ocultos en celulares con 'hidden md:flex') */}
          <div className="hidden md:flex space-x-10">
            <Link href="#" className="text-lg font-medium text-zinc-700 hover:text-teal-600 transition-colors">Novias</Link>
            <Link href="#" className="text-lg font-medium text-zinc-700 hover:text-teal-600 transition-colors">Lugares</Link>
            <Link href="#" className="text-lg font-medium text-zinc-700 hover:text-teal-600 transition-colors">Banquetería</Link>
            <Link href="#" className="text-lg font-medium text-zinc-700 hover:text-teal-600 transition-colors">Multimedia</Link>
            <Link href="#" className="text-lg font-medium text-zinc-700 hover:text-teal-600 transition-colors">Otros</Link>
          </div>

          <div className="flex items-center gap-2">
            {!session ? (
              <>
                <AuthModal 
                  buttonText="Entrar" 
                  variant="ghost" 
                  signInAction={handleSignIn}
                  className="font-semibold text-zinc-700 hover:text-teal-600"
                />
                <AuthModal 
                  buttonText="Regístrate" 
                  signInAction={handleSignIn}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full px-6"
                />
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-600 hidden sm:block">
                  Hola, <strong className="text-teal-700">{session.user?.name}</strong>
                </span>
                <form action={async () => { "use server"; await signOut(); }}>
                  <Button variant="outline" type="submit" className="rounded-full border-zinc-300">
                    Salir
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}