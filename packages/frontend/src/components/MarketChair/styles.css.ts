import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme.css";

export const container = style({
  background: vars.colors.backgroundSecondary,
  boxShadow: vars.shadow,
  borderRadius: vars.borderRadius.medium,
  display: "flex",
  flexDirection: "column",
  width: `calc(25% - ${vars.margins.high} * 3 / 4)`,
  overflow: "hidden",
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
});

export const imageContaienr = style({
  background: vars.colors.white,
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const divider = style({
  background: vars.colors.secondary,
  height: 2,
});

export const content = style({
  padding: `${vars.margins.small} ${vars.margins.medium}`,
  display: "flex",
  flexDirection: "column",
  gap: vars.margins.small,
  flex: 1,
});

export const contentTitle = style({
  flex: 1,
});

export const footer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: vars.fontSize.caption,
});

export const discountPriceContainer = style({
  display: "flex",
  flexDirection: "column",
});

export const discountPrice = style({
  marginBottom: -4,
  fontSize: vars.fontSize.label,
  color: vars.fontColors.hint,
  textDecorationLine: "line-through",
});
