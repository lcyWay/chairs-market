import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "./theme.css";

const gradienBackgroundKeyframes = keyframes({
  to: { backgroundPosition: "-400%" },
});

export const gradienBackground = style({
  background: `
  linear-gradient(45deg, 
    rgb(255, 255, 255) 0%, 
    rgb(254, 254, 254) 35%, 
    rgb(250, 250, 252) 50%, 
    rgb(254, 254, 254) 65%, 
    rgb(255, 255, 255) 100%)
  ;`,
  backgroundSize: "400% 100%",
  borderRadius: vars.borderRadius.medium,
  boxShadow: "0px 0px 12px #6e6f7610",
  animation: `${gradienBackgroundKeyframes} 3.5s infinite linear`,
});
