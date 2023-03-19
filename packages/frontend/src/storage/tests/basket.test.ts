const TEST_ITEM_ID = "j43hj43j";
const TEST_ITEM_PRICE = 5000;

fetchMock.mockResponse(async (req) => {
  if (req.url.includes("chairs"))
    return Promise.resolve(
      JSON.stringify({
        success: true,
        data: [{ id: TEST_ITEM_ID, title: "title", price: TEST_ITEM_PRICE, discount_price: null, image_url: "" }],
      })
    );
  return Promise.resolve(JSON.stringify({ success: true, data: [] }));
});
import { BasketStorage, DELIVERY_PRICE } from "storage/BasketStorage";

function mockOnce(response: object) {
  fetchMock.once((req) => {
    // @ts-ignore
    const body = JSON.parse(req.body);
    expect(body.id).toBe(TEST_ITEM_ID);
    return Promise.resolve(JSON.stringify(response));
  });
}

test("basket storage", async () => {
  BasketStorage.setBasket([
    { count: 1, id: TEST_ITEM_ID },
    { count: 2, id: "tejkasj3" },
  ]);

  expect(BasketStorage.basket.length).toBe(2);
  expect(BasketStorage.basketChairs.length).toBe(1);
  expect(BasketStorage.basketPrice).toBe(TEST_ITEM_PRICE + DELIVERY_PRICE);

  mockOnce({ success: false });
  await BasketStorage.addChairInBasket(TEST_ITEM_ID);
  expect(BasketStorage.basket.length).toBe(2);
  expect(BasketStorage.basketChairs.length).toBe(1);

  mockOnce({ success: true, data: [{ id: TEST_ITEM_ID, count: 1 }] });
  await BasketStorage.addChairInBasket(TEST_ITEM_ID);
  expect(BasketStorage.basket.length).toBe(1);
  expect(BasketStorage.basketChairs.length).toBe(1);
  expect(BasketStorage.basket[0].id).toBe(TEST_ITEM_ID);
  expect(BasketStorage.basketPrice).toBe(TEST_ITEM_PRICE + DELIVERY_PRICE);

  mockOnce({ success: false });
  await BasketStorage.removeChairFromBasket(TEST_ITEM_ID);
  expect(BasketStorage.basket.length).toBe(1);

  fetchMock.once("");
  await BasketStorage.loadBasket();
  expect(BasketStorage.basket.length).toBe(1);

  mockOnce({ success: true, data: [] });
  await BasketStorage.removeChairFromBasket(TEST_ITEM_ID);
  expect(BasketStorage.basket.length).toBe(0);
  expect(BasketStorage.basketChairs.length).toBe(0);
});
