export const formatNumberToCurrency = (value: number) => {
  if (!value) return 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
};
