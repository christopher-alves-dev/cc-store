import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: number;
};

export const MetricCard = ({ icon, label, value = 0 }: Props) => {
  const Icon = icon;

  return (
    <div className="flex h-28 flex-[1_1_200px] flex-col items-center justify-center rounded-lg border border-solid border-border px-4 lg:h-40 lg:px-0">
      <div className="flex items-center gap-2">
        <div className="text-2xl">
          <Icon className="h-[1em] w-[1em] text-primary" />
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </div>

      <h3 className="text-center text-lg">{label}</h3>
    </div>
  );
};
