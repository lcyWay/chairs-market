import React from "react";
import { observer } from "mobx-react-lite";

import MarketChair from "components/MarketChair";
import ButtonLoading from "components/LoadingLayouts/ButtonLoading";
import MarketChairLoading from "components/LoadingLayouts/MarketChairLoading";

import Button from "primitives/Button";

import { GlobalStorage } from "storage/GlobalStorage";
import { BasketStorage } from "storage/BasketStorage";

import { headerContainer, headerTitle, itemsContainer, tagsContainer } from "./style.css";

function HomeView() {
  React.useEffect(() => GlobalStorage.clearSelectedTags, []);

  const handleTagsSelect = React.useCallback((id: string) => GlobalStorage.changeSelectedTags(id), []);

  return (
    <>
      <div className={headerContainer}>
        <div className={headerTitle}>Игровые кресла</div>
        <div className={tagsContainer}>
          {GlobalStorage.tagsLoading && new Array(8).fill(1).map((_, index) => <ButtonLoading key={index} />)}
          {GlobalStorage.tags.map(({ name, id }) => (
            <Button
              variant={GlobalStorage.selectedTags.includes(id) ? "primary" : "white"}
              onClick={() => handleTagsSelect(id)}
              disabled={GlobalStorage.chairsLoading || BasketStorage.basketChairsCountLoading}
              key={id}
            >
              {name}
            </Button>
          ))}
        </div>
      </div>
      <div className={itemsContainer}>
        {GlobalStorage.chairsLoading && new Array(8).fill(1).map((_, index) => <MarketChairLoading key={index} />)}
        {GlobalStorage.chairs.map((chair) => (
          <MarketChair
            key={chair.id}
            disabled={BasketStorage.basketChairsCountLoading}
            onBuy={BasketStorage.addChairInBasket}
            chair={chair}
          />
        ))}
      </div>
    </>
  );
}

export default observer(HomeView);
