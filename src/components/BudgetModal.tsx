"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BudgetModal({ vendorName }: { vendorName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* Este es el mismo botón que tenías, pero ahora funciona como gatillo */}
        <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-8 px-12 mb-8 text-xl w-auto shadow-lg transition-all hover:scale-105 active:scale-95">
          Pedir Presupuesto
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Solicitar Presupuesto</DialogTitle>
          <DialogDescription>
            Envía un mensaje directo a <strong>{vendorName}</strong>. Te responderán a tu correo a la brevedad.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Aquí en el futuro conectaremos con un envío de email o base de datos
            alert("¡Simulación: Mensaje enviado con éxito!");
            setIsOpen(false); // Cierra el modal automáticamente
          }}
          className="flex flex-col gap-4 py-2"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Tus Nombres</Label>
            <Input id="name" placeholder="Ej. Camila y Nicolás" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Tu Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Fecha de la Boda (Aproximada)</Label>
            <Input id="date" type="date" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Mensaje</Label>
            {/* Usamos las mismas clases de Tailwind de tu componente Input para mantener el diseño */}
            <textarea
              id="message"
              rows={4}
              className="w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="¡Hola! Nos encanta su trabajo y nos gustaría saber disponibilidad y precios para nuestro evento..."
              required
            />
          </div>

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-4 text-lg py-6">
            Enviar Mensaje
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}