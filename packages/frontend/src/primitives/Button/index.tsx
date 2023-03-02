import React from "react";

import { button } from "./style.css";

interface ButtonInterface {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "white";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({ children, disabled = false, variant = "primary", onClick }: ButtonInterface) {
  const handleButtonClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!onClick || disabled) return;
      onClick(event);
    },
    [onClick, disabled]
  );

  return (
    <button className={button[variant]} disabled={disabled} onClick={handleButtonClick}>
      {children}
    </button>
  );
}

export default React.memo(Button);
