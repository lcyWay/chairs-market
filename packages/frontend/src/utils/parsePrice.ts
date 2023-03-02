const PRICE_CURRENCY = "₽";

export function parsePrice(price: number) {
  const priceArray = price.toString().split("");

  for (let i = priceArray.length; i > 0; i -= 3) {
    if (i === priceArray.length) continue;
    priceArray.splice(i, 0, " ");
  }

  return priceArray.join("") + " " + PRICE_CURRENCY;
}
