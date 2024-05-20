import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  pending?: boolean;
};

export const DeleteButton = ({ pending = false, children, ...rest }: Props) => {
  return (
    <Button
      className="w-full gap-2"
      variant="secondary"
      disabled={pending}
      {...rest}
    >
      {pending ? (
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
