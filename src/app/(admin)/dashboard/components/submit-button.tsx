"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full gap-2" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="h-[1em] w-[1em] animate-spin" />
          Salvando
        </>
      ) : (
        <>Salvar</>
      )}
    </Button>
  );
};
