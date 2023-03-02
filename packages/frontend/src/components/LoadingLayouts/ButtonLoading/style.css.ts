import { style } from "@vanilla-extract/css";

import { gradienBackground } from "styles/gradient.css";

export const loadingButtonStyles = style([
  gradienBackground,
  {
    border: 0,
    width: 80,
    height: 34,
  },
]);
