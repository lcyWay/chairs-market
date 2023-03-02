import { action, makeObservable, observable, runInAction } from "mobx";

import { ApiAbstractClass } from "api";

import { BasketChairInterface, BasketInterface } from "types/basket";

import { GlobalStorage } from "./GlobalStorage";

const DELIVERY_PRICE = 1000;

class BasketStorageClass extends ApiAbstractClass {
  constructor() {
    super();
    makeObservable(this);
  }

  @observable
  basketLoading = true;

  @observable
  basketChairsCountLoading = false;

  @observable
  basket: BasketInterface = [];

  @observable
  basketChairs: BasketChairInterface[] = [];

  @observable
  basketPrice = DELIVERY_PRICE;

  @action.bound
  setBasket(basket: BasketInterface) {
    this.basket = basket;
    this.validateBasket();
  }

  @action.bound
  async addChairInBasket(id: string) {
    this.basketChairsCountLoading = true;
    const result = await this.makeRequest<BasketInterface>("/basket/add", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    this.basketChairsCountLoading = false;
    if (!result.success) return;
    this.setBasket(result.data);
  }

  @action.bound
  async removeChairFromBasket(id: string) {
    this.basketChairsCountLoading = true;
    const result = await this.makeRequest<BasketInterface>("/basket/remove", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    this.basketChairsCountLoading = false;
    if (!result.success) return;
    this.setBasket(result.data);
  }

  @action.bound
  async loadBasket() {
    this.basketLoading = true;
    const result = await this.makeRequest<BasketInterface>("/basket/current");
    this.basketLoading = false;
    if (!result.success) return;
    this.setBasket(result.data);
  }

  @action.bound
  validateBasket() {
    const basketChairs: BasketChairInterface[] = [];
    let basketPrice = DELIVERY_PRICE;

    this.basket.forEach(({ id, count }) => {
      const foundItem = GlobalStorage.chairs.find((chair) => chair.id === id);
      if (!foundItem) return;
      basketChairs.push({ ...foundItem, count });
      basketPrice += (foundItem.discount_price || foundItem.price) * count;
    });

    this.basketChairs = basketChairs;
    this.basketPrice = basketPrice;
  }
}

export const BasketStorage = new BasketStorageClass();

runInAction(() => BasketStorage.loadBasket());
