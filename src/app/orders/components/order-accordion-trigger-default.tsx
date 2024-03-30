type Props = {
  code: number;
};

export const OrderAccordionTriggerDefault = ({ code }: Props) => {
  return (
    <div className="flex flex-col gap-1 text-left lg:hidden">
      <p className="text-sm font-bold uppercase lg:text-base">
        Número do pedido
      </p>
      <span className="text-xs opacity-60 lg:text-sm">#00{code}</span>
    </div>
  );
};
