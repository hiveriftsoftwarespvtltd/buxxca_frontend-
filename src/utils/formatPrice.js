export const formatPrice = (price) => {
  if (price === undefined || price === null) return "Rs. 0";
  return "Rs. " + Number(price).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};
