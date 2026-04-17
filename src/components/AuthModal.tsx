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

interface AuthModalProps {
  buttonText: string;
  variant?: "default" | "ghost" | "outline" | "destructive";
  className?: string;
  signInAction: (formData: FormData) => Promise<void>;
}

export function AuthModal({ buttonText, variant = "default", className, signInAction }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Bienvenido a MeCaso</DialogTitle>
          <DialogDescription className="text-center">
            Ingresa tu correo para iniciar sesión o registrarte instantáneamente.
          </DialogDescription>
        </DialogHeader>
        
        <form
          action={async (formData) => {
            await signInAction(formData);
            setIsOpen(false); // Cerramos el modal tras el login
          }}
          className="flex flex-col gap-4 py-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              required
              className="col-span-3"
            />
          </div>
          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            Continuar con mi correo
          </Button>
        </form>
        
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-zinc-500">O también</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" disabled>
          Continuar con Google (Próximamente)
        </Button>
      </DialogContent>
    </Dialog>
  );
}