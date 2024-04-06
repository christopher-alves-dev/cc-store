"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  const handleLoginClick = async () => {
    await signIn();
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <p className="text-center font-semibold">
        Faça login para ver seus pedidos
      </p>

      <Button onClick={handleLoginClick} className="w-fit justify-start gap-2">
        <LogInIcon size={16} />
        Fazer Login
      </Button>
    </div>
  );
};
