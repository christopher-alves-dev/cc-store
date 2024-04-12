export const calculateTotalPrice = (
  price: string,
  discountPercentage: number,
): number => {
  if (!price || !discountPercentage) return 0;

  const priceNumber = Number(price.replace(".", "").replace(",", "."));
  const discountPercentageNumber = Number(discountPercentage);

  const discount = (priceNumber * discountPercentageNumber) / 100;
  const totalPrice = priceNumber - discount;

  return totalPrice;
};
