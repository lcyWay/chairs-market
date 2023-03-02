import React from "react";

import Button from "primitives/Button";

import { parsePrice } from "utils/parsePrice";

import { ChairInterface } from "types/chair";

import {
  container,
  content,
  contentTitle,
  discountPrice,
  discountPriceContainer,
  divider,
  footer,
  imageContaienr,
} from "./styles.css";

interface MarketChairInterface {
  chair: ChairInterface;
  disabled: boolean;
  onBuy: (id: string) => void;
}

function MarketChair({ chair, disabled, onBuy }: MarketChairInterface) {
  const handleBuyClick = React.useCallback(() => onBuy(chair.id), [onBuy, chair]);

  return (
    <div className={container}>
      <div className={imageContaienr}>
        <img src={chair.image_url} />
      </div>
      <div className={divider} />
      <div className={content}>
        <div className={contentTitle}>{chair.title}</div>
        <div className={footer}>
          {chair.discount_price ? (
            <div className={discountPriceContainer}>
              <div className={discountPrice}>{parsePrice(chair.price)}</div>
              <div>{parsePrice(chair.discount_price)}</div>
            </div>
          ) : (
            parsePrice(chair.price)
          )}
          <Button disabled={disabled} onClick={handleBuyClick}>
            Купить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MarketChair);
