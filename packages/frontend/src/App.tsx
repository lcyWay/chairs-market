import React from "react";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";

import Header from "components/Header";

import { baseClass, contentContainer } from "styles/theme.css";

const BasketView = loadable(() => import("views/Basket"));
const HomeView = loadable(() => import("views/Home"));

function App() {
  return (
    <div className={baseClass}>
      <Header />
      <div className={contentContainer}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>
          <Route path="/basket/" exact>
            <BasketView />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
