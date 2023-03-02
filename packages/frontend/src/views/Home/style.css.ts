import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme.css";

export const headerContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.margins.medium,
});

export const headerTitle = style({
  fontSize: vars.fontSize.caption,
});

export const tagsContainer = style({
  display: "flex",
  gap: vars.margins.medium,
  flexWrap: "wrap",
  "@media": {
    "(max-width: 660px)": {
      gap: vars.margins.small,
    },
  },
});

export const itemsContainer = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.margins.high,
  "@media": {
    "(max-width: 660px)": {
      gap: vars.margins.medium,
    },
  },
});
