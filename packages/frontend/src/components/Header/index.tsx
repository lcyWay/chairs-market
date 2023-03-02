import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { BasketStorage } from "storage/BasketStorage";

import { container, content, link, titleText } from "./styles.css";

function Header() {
  return (
    <div className={container}>
      <div className={content}>
        <Link to="/" className={titleText}>
          Chairs Market
        </Link>
        <Link to="/basket/" className={link}>
          Корзина ({BasketStorage.basket.length})
        </Link>
      </div>
    </div>
  );
}

export default observer(Header);
