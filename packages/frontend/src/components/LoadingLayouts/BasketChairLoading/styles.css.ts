import { style } from "@vanilla-extract/css";
import { gradienBackground } from "styles/gradient.css";

export const basketChairLayout = style([
  gradienBackground,
  {
    height: 132,
    "@media": {
      "(max-width: 424px)": {
        height: 80,
      },
    },
  },
]);
