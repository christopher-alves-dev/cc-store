type Props = {
  label: string;
  orderDate: string;
};

export const OrderAccordionTriggerDefault = ({ label, orderDate }: Props) => {
  return (
    <div className="flex flex-col gap-1 text-left lg:hidden">
      <p className="text-sm font-bold uppercase lg:text-base">{label}</p>
      <span className="text-xs opacity-60 lg:text-sm">
        Feito em {orderDate}
      </span>
    </div>
  );
};
