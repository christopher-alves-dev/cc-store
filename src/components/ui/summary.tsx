import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  value: string | number;
  className?: string;
};

export const Summary = ({ label, value, className }: Props) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between text-xs lg:text-sm",
        className,
      )}
    >
      <p className="capitalize">{label}</p>
      <p className="uppercase">{value}</p>
    </div>
  );
};
