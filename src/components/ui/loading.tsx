import { Loader2 } from "lucide-react";

type Props = {
  text: string;
};

export const Loader = ({ text }: Props) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-base">
        <Loader2 className="h-[1em] w-[1em] animate-spin" />
        <p>{text}</p>
      </div>
    </div>
  );
};
