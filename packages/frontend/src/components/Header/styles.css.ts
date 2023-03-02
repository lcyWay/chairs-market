import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme.css";

export const container = style({
  background: vars.colors.background,
  boxShadow: vars.shadow,
  position: "sticky",
  top: 0,
});

export const content = style({
  display: "flex",
  justifyContent: "space-between",
  maxWidth: vars.contentWidth,
  margin: "0 auto",
  padding: `0 ${vars.margins.medium}`,
  height: 48,
});

export const link = style({
  color: "inherit",
  textDecoration: "unset",
  display: "flex",
  alignItems: "center",
});

export const titleText = style([
  link,
  {
    fontSize: vars.fontSize.caption,
  },
]);
