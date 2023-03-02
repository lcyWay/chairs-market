import { ChairInterface } from "./chair";

interface BasketCacheChairInterface {
  id: string;
  count: number;
}

export type BasketInterface = BasketCacheChairInterface[];

export type BasketChairInterface = ChairInterface & BasketCacheChairInterface;
