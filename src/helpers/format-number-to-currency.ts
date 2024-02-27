export const formatNumberToCurrency = (value: number) => {
  if (!value && value !== 0) return 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
};
