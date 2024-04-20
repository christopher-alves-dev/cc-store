"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: ReactNode;
};

export const DeleteButton = ({ children }: Props) => {
  const { pending, method } = useFormStatus();
  const isMethodDelete = method === "delete";

  return (
    <Button className="w-full gap-2" variant="secondary" disabled={pending}>
      {isMethodDelete && pending ? (
        <>
          <Loader2 className="h-[1em] w-[1em] animate-spin" />
          Removendo
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};
