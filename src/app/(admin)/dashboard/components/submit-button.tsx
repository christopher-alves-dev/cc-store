import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  pending?: boolean;
  loadingLabel?: string;
  label: string;
};

export const SubmitButton = ({
  pending = false,
  label,
  loadingLabel = "Salvando",
  ...rest
}: Props) => {
  return (
    <Button className="w-full gap-2" disabled={pending} {...rest}>
      {pending ? (
        <>
          <Loader2 className="h-[1em] w-[1em] animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>{label}</>
      )}
    </Button>
  );
};
