import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  pending?: boolean;
};

export const SubmitButton = ({ pending = false, ...rest }: Props) => {
  return (
    <Button className="w-full gap-2" disabled={pending} {...rest}>
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
