import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme.css";

export const basketInfoContainer = style({
  display: "flex",
  gap: vars.margins.medium,
  alignItems: "center",
  justifyContent: "space-between",
  "@media": {
    "(max-width: 568px)": {
      flexDirection: "column",
      justifyContent: "normal",
      alignItems: "normal",
    },
  },
});

export const basketInfo = style({
  display: "flex",
  flexDirection: "column",
  fontSize: vars.fontSize.caption,
});

export const emptyBasketContainer = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: vars.fontSize.caption,
  gap: vars.margins.medium,
});
