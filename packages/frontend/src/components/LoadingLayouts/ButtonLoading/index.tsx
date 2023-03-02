import React from "react";

import { loadingButtonStyles } from "./style.css";

function ButtonLoading() {
  return <div className={loadingButtonStyles} />;
}

export default React.memo(ButtonLoading);
