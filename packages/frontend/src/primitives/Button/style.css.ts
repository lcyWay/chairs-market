import { style, styleVariants } from "@vanilla-extract/css";

import { vars } from "styles/theme.css";

const buttonStyles = style({
  border: 0,
  borderRadius: vars.borderRadius.medium,
  fontSize: vars.fontSize.label,
  fontFamily: vars.fontFamily,
  padding: `${vars.margins.small} ${vars.margins.medium}`,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: `background ${vars.transition}, color ${vars.transition}`,
  ":disabled": {
    cursor: "default",
    color: vars.fontColors.light,
    background: vars.colors.secondary,
  },
});

export const button = styleVariants({
  primary: [buttonStyles, { background: vars.colors.primary, color: vars.fontColors.light }],
  white: [buttonStyles, { background: vars.colors.white, color: vars.fontColors.dark, boxShadow: vars.shadow }],
});
