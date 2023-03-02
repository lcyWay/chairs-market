import React from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import BasketChair from "components/BasketChair";
import BasketChairLoading from "components/LoadingLayouts/BasketChairLoading";

import Button from "primitives/Button";

import { BasketStorage } from "storage/BasketStorage";
import { GlobalStorage } from "storage/GlobalStorage";

import { parsePrice } from "utils/parsePrice";

import { basketInfo, basketInfoContainer, emptyBasketContainer } from "./style.css";

function BasketView() {
  const history = useHistory();

  const handleBuyChairsClick = React.useCallback(() => history.push("/"), [history]);

  if (!GlobalStorage.chairsLoading && !BasketStorage.basketLoading && BasketStorage.basketChairs.length === 0)
    return (
      <>
        <div className={emptyBasketContainer}>
          <div>Пустая корзина 😱</div>
          <Button onClick={handleBuyChairsClick}>За креслами!</Button>
        </div>
      </>
    );

  if (GlobalStorage.chairsLoading || BasketStorage.basketLoading)
    return (
      <>
        {new Array(4).fill(1).map((_, index) => (
          <BasketChairLoading key={index} />
        ))}
      </>
    );

  return (
    <>
      {BasketStorage.basketChairs.map((chair) => (
        <BasketChair
          key={chair.id}
          onAdd={BasketStorage.addChairInBasket}
          onRemove={BasketStorage.removeChairFromBasket}
          chair={chair}
          disabled={BasketStorage.basketChairsCountLoading}
        />
      ))}
      <div className={basketInfoContainer}>
        <div className={basketInfo}>
          <div>Доставка: 1 000 ₽ (3-4 дня)</div>
          <div>ИТОГО: {parsePrice(BasketStorage.basketPrice)}</div>
        </div>
        <Button disabled={BasketStorage.basketChairsCountLoading}>Оплатить онлайн</Button>
      </div>
    </>
  );
}

export default observer(BasketView);
