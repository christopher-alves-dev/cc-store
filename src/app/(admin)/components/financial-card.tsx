import { Landmark, LucideIcon } from "lucide-react";
import { useMemo } from "react";

type Props = {
  icon: LucideIcon;
  title: string;
  value: number;
};

export const FinancialCard = ({ icon, title, value = 0 }: Props) => {
  const Icon = icon;
  const currencyValue = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value),
    [value],
  );

  return (
    <div className="flex flex-col gap-1.5 rounded-lg bg-gradient-to-r from-[#36393C] from-0% via-[#36393C66] via-40% to-[#36393C66] to-100% px-4 py-6 md:px-7 md:py-10">
      <div className="flex items-center gap-2">
        <div className="text-xl md:text-2xl">
          <Icon className="h-[1em] w-[1em]" />
        </div>
        <h3 className="text-sm leading-none md:text-lg">{title}</h3>
      </div>

      <p className="text-2xl font-bold md:text-3xl">{currencyValue}</p>
    </div>
  );
};
