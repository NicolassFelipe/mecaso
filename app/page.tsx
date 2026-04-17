import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  // 1. Obtenemos los usuarios de la base de datos
  const allUsers = await db.select().from(users);

  // 2. Definimos el Server Action (La función que corre en el servidor)
  async function addUser(formData: FormData) {
    "use server"; // Esta línea es magia pura: le dice a Next.js que esto es backend
    
    const nombre = formData.get("nombre") as string;
    const email = formData.get("email") as string;

    // Insertamos en la DB
    await db.insert(users).values({ nombre, email });
    
    // Recargamos la página para ver el nuevo usuario
    revalidatePath("/");
  }

  return (
    <main className="p-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">MeCaso - Testing DB</h1>

      {/* Formulario que ejecuta el Server Action */}
      <form action={addUser} className="flex gap-4 mb-10">
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre" 
          required 
          className="border p-2 rounded text-black"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          className="border p-2 rounded text-black"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Agregar Usuario
        </button>
      </form>

      {/* Lista de usuarios */}
      <h2 className="text-xl font-semibold mb-4">Usuarios en la Base de Datos:</h2>
      <ul className="space-y-2">
        {allUsers.length === 0 ? (
          <p className="text-gray-500">No hay usuarios todavía.</p>
        ) : (
          allUsers.map((user) => (
            <li key={user.id} className="border p-4 rounded bg-gray-50 text-black">
              <strong>{user.nombre}</strong> - {user.email} (Rol: {user.role})
            </li>
          ))
        )}
      </ul>
    </main>
  );
}