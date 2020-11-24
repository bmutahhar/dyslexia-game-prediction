import React from "react";
import "./styles/Button.css";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--large", "btn--medium", "btn--mobile", "btn--wide","btn--small"];

const COLORS = ["primary", "blue", "green", "red"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonColor = COLORS.includes(buttonColor)
    ? buttonColor
    : COLORS[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
