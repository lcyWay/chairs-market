import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme.css";

export const container = style({
  background: vars.colors.backgroundSecondary,
  boxShadow: vars.shadow,
  borderRadius: vars.borderRadius.medium,
  overflow: "hidden",
  display: "flex",
});

export const imageContaienr = style({
  background: vars.colors.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const image = style({
  maxWidth: 132,
  maxHeight: 132,
  objectFit: "contain",
  "@media": {
    "(max-width: 424px)": {
      height: 80,
    },
  },
});

export const divider = style({
  background: vars.colors.secondary,
  width: 2,
});

export const content = style({
  padding: `${vars.margins.small} ${vars.margins.medium}`,
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: vars.margins.small,
});

export const contentHeader = style({
  display: "flex",
  justifyContent: "space-between",
  flex: 1,
  "@media": {
    "(max-width: 568px)": {
      flex: 0,
    },
  },
});

export const footer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: vars.fontSize.caption,
  "@media": {
    "(max-width: 568px)": {
      justifyContent: "right",
    },
  },
});

export const lowResolutionPriceBlock = style({
  display: "none",
  "@media": {
    "(max-width: 568px)": {
      display: "flex",
      justifyContent: "space-between",
      flex: 1,
    },
  },
});

export const highResolutionPriceBlock = style({
  "@media": {
    "(max-width: 568px)": {
      display: "none",
    },
  },
});

export const discountPriceContainer = style({
  display: "flex",
  flexDirection: "column",
  "@media": {
    "(max-width: 568px)": {
      flexDirection: "row",
      gap: vars.margins.small,
    },
  },
});

export const discountPrice = style({
  marginBottom: -4,
  fontSize: vars.fontSize.label,
  color: vars.fontColors.hint,
  textDecorationLine: "line-through",
});

export const buttonsContainer = style({
  display: "flex",
  gap: vars.margins.small,
});
