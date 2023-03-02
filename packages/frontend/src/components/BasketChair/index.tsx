import React from "react";

import Button from "primitives/Button";

import { parsePrice } from "utils/parsePrice";

import { BasketChairInterface } from "types/basket";

import {
  buttonsContainer,
  container,
  content,
  contentHeader,
  discountPrice,
  discountPriceContainer,
  divider,
  footer,
  highResolutionPriceBlock,
  image,
  imageContaienr,
  lowResolutionPriceBlock,
} from "./styles.css";

interface BasketChairCardInterface {
  chair: BasketChairInterface;
  disabled: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

function BasketChairCard({ chair, disabled, onAdd, onRemove }: BasketChairCardInterface) {
  const handleAddClick = React.useCallback(() => onAdd(chair.id), [onAdd, chair]);
  const handleRemoveClick = React.useCallback(() => onRemove(chair.id), [onRemove, chair]);

  const price = React.useMemo(
    () =>
      chair.discount_price ? (
        <div className={discountPriceContainer}>
          <div className={discountPrice}>{parsePrice(chair.price)}</div>
          <div>{parsePrice(chair.discount_price)}</div>
        </div>
      ) : (
        parsePrice(chair.price)
      ),
    [chair]
  );

  return (
    <div className={container}>
      <div className={imageContaienr}>
        <img className={image} src={chair.image_url} />
      </div>
      <div className={divider} />
      <div className={content}>
        <div className={contentHeader}>
          <div>{chair.title}</div>
          <div className={highResolutionPriceBlock}>{chair.count} шт.</div>
        </div>
        <div className={lowResolutionPriceBlock}>
          {price}
          <div>{chair.count} шт.</div>
        </div>
        <div className={footer}>
          <div className={buttonsContainer}>
            <Button disabled={disabled} onClick={handleAddClick}>
              Добавить
            </Button>
            <Button disabled={disabled} onClick={handleRemoveClick}>
              Убрать
            </Button>
          </div>
          <div className={highResolutionPriceBlock}>{price}</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BasketChairCard);
