export const percentFormatter = new Intl.NumberFormat("ua-UA", {
  style: "percent",
  maximumFractionDigits: 3,
});

export const priceFormatter = new Intl.NumberFormat("ua-UA", {
  style: "currency",
  currency: "UAH",
  maximumFractionDigits: 0,
});

export const priceFormatterDecimal = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "UAH",
  maximumFractionDigits: 2,
});
