type OrderData = {
  code: number;
  status: string;
  orderDate: string;
  paymentType: string;
};

type Props = {
  data: OrderData;
};

export const OrderAccordionTriggerDesktop = ({ data }: Props) => {
  return (
    <div className="hidden w-full text-sm lg:flex lg:items-center lg:justify-between">
      <div className="flex flex-col items-start gap-1">
        <p className="text-base font-bold uppercase">Número do pedido</p>
        <p className="text-xs opacity-60"># 00{data.code}</p>
      </div>

      <div className="flex flex-col items-start gap-1">
        <p className="text-base font-bold uppercase">Status</p>
        <p className="text-xs text-[#8162FF]">{data.status}</p>
      </div>

      <div className="flex flex-col items-start gap-1">
        <p className="text-base font-bold uppercase">Data</p>
        <p className="text-xs opacity-60">{data.orderDate}</p>
      </div>

      <div className="flex flex-col items-start gap-1">
        <p className="text-base font-bold uppercase">Pagamento</p>
        <p className="text-xs opacity-60">{data.paymentType}</p>
      </div>
    </div>
  );
};
