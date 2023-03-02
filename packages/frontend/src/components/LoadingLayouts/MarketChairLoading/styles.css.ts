import { style } from "@vanilla-extract/css";
import { gradienBackground } from "styles/gradient.css";

import { vars } from "styles/theme.css";

export const marketChairLoading = style([
  gradienBackground,
  {
    width: `calc(25% - ${vars.margins.high} * 3 / 4)`,
    height: 331,
    "@media": {
      "(max-width: 900px)": {
        width: `calc(100% / 3 - ${vars.margins.high} * 2 / 3)`,
      },
      "(max-width: 660px)": {
        width: `calc(50% - ${vars.margins.medium} / 2)`,
      },
      "(max-width: 424px)": {
        width: "100%",
      },
    },
  },
]);
